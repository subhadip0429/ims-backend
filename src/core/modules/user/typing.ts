import {MongooseObjectID} from "@global/types";
import {Document} from "mongoose";

export enum UserRole {
    ADMIN = "ADMIN",
    GENERAL = "GENERAL"
}

export type UserPermissions = string[];

interface IUserBase{
    name: string
    email: string
    password: string
    role: UserRole
    lastLoginAt: Date,
    blockedAt: Date,
    permissions?: UserPermissions
    createdBy?: (MongooseObjectID | IUser),
    createdAt?: Date
    updatedAt?: Date
}

export interface IUser extends IUserBase, Document {
    isAdmin():boolean,
    authenticate(password:string):boolean,
    getToken():string
}
