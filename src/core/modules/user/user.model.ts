import {model, Schema, Types} from "mongoose";
import * as softDeletePlugin from "mongoose-delete";
import {sign as JWTSign } from "jsonwebtoken";
import {compareSync as compareHash, hashSync as hash} from "bcrypt";
import {IUserDocument, UserRole} from "./typing";

const UserSchema:Schema<IUserDocument> = new Schema<IUserDocument>({
    name: { type: String, required: true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    role: {type: String, enum: Object.values(UserRole), default: UserRole.GENERAL},
    createdBy: {type: Types.ObjectId, ref:'User'},
    permissions: [String],
    lastLoginAt : {type: Date, default: new Date()},
    blockedAt: Date
},{
    timestamps: true
});

UserSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    }
});

UserSchema.plugin(softDeletePlugin,{ overrideMethods: true, deletedAt: true });

UserSchema.method('isAdmin', function (){
    return this.role == UserRole.ADMIN;
})
UserSchema.method('authenticate', async function (password:string) {
    const user = this;
    const hashed_password = user.password;
    if(!compareHash(password, hashed_password)) return false;
    user.lastLoginAt = new Date();
    await user.save();

    return true;
});

UserSchema.method('getToken', function (){
    const options: any = { expiresIn: '1d' };
    return JWTSign({user_id: this._id}, 'secret', options);
});

UserSchema.pre('save', function (next){
   if(this.isModified('password')){
       this.password = hash(this.password, 10);
   }
   return next();
});



export const User:softDeletePlugin.SoftDeleteModel<IUserDocument> = model<IUserDocument, softDeletePlugin.SoftDeleteModel<IUserDocument>>('User',UserSchema);
