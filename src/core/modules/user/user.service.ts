import {Singleton} from "@decorators";
import {IUser, UserRole} from "@modules/user/typing";
import {User} from "./user.model";

@Singleton
export class UserService {
   async create(name:string, email:string, password:string, role:UserRole, createdBy:IUser = null) : Promise<{ user_id: string, token: string }> {
       const user = new User({
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
        let user = await User.findOne({email}).exec();
        if(!user) throw new Error("Email ID not registered");
        let authenticated = await user.authenticate(password);
        if(!authenticated) throw new Error("Invalid password");
        return {
            user_id : user._id,
            token : user.getToken()
        }
    }

    async updatePermissions(id:string, permissions: string[]){
       let user = await User.findById(id);
       if(!user) throw new Error("User not found");
       user.permissions = permissions;
       await user.save();
    }
}
