import {MongooseObjectID} from "@global/types";
import {Document} from "mongoose";

export enum UserRole {
    ADMIN = "ADMIN",
    GENERAL = "GENERAL"
}

export type UserPermissions = string[];

export interface IUser{
    name: string
    email: string
    password: string
    role: UserRole
    lastLoginAt: Date,
    blockedAt: Date,
    permissions?: UserPermissions
    createdBy?: (MongooseObjectID | IUserDocument),
    createdAt?: Date
    updatedAt?: Date
}

export interface IUserDocument extends IUser, Document {
    isAdmin():boolean,
    authenticate(password:string):boolean,
    getToken():string
}
