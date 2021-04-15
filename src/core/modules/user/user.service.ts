import {Singleton} from "@decorators";
import {IUser, IUserDocument, UserRole} from "@modules/user/typing";
import {User} from "./user.model";
import {Service} from "@core/service";

@Singleton
export class UserService extends Service<IUserDocument, IUser>{
    constructor() {
        super();
        this.setModel(User);
    }
   async add(name:string, email:string, password:string, role:UserRole, createdBy:IUserDocument = null) : Promise<{ user_id: string, token: string }> {
       const user = this.builder({
           name,
           email,
           password,
           role
       });
       if(createdBy){
           user.createdBy = createdBy;
       }
       if(role == UserRole.ADMIN){
           user.permissions.push("*");
       }
       await user.save();
       return {
           user_id : user._id,
           token : user.getToken()
       }
    }

    async authenticate(email:string, password:string):Promise<{ user_id: string, token: string }> {
        let user = await this.findOne({email}).exec();
        if(!user) throw new Error("NOT FOUND");
        let authenticated = await user.authenticate(password);
        if(!authenticated) throw new Error("WRONG PASSWORD");
        return {
            user_id : user._id,
            token : user.getToken()
        }
    }

    async updatePermissions(id:string, permissions: string[]){
       let user = await User.findById(id);
       if(!user) throw new Error("NOT FOUND");
       user.permissions = permissions;
       await user.save();
    }
}
