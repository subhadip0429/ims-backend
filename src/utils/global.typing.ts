import {Types} from "mongoose";
import {IUser} from "@modules/user"

export type MongooseObjectID = Types.ObjectId | string ;

export type Environment = "development" | "production" | "testing";
export type HTTP_STATUS_CODE = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500 ;
export enum HTTP_STATUS {
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401 ,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

//Custom declaration overriding
declare global {
    namespace Express {
        export interface Request {
            loggedUser?: IUser
        }
    }
}

