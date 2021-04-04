import {NextFunction, Request, Response} from "express";
import {IUser} from "@modules/user";
import {ResponseMessage} from "@services/MessageService";
import {array_wrap, response_handler} from "@helpers";
import {HTTP_STATUS} from "@global/types";


 export function verify_permission(required_permissions:(string | string[])) {
     return function (request:Request, response:Response, next:NextFunction) {

         if (!request.isAuthenticated()) {
             return response_handler(401, "Unauthorized")
                 .send(response);
         }

         const authenticatedUser: IUser = request.loggedUser;

         if (authenticatedUser.isAdmin()) {
             return next();
         }

         let hasNoPermission = array_wrap(required_permissions)
             .find(permission => !authenticatedUser.permissions.includes(permission));

         if(hasNoPermission){
             return response_handler(HTTP_STATUS.FORBIDDEN, "Access Denied")
                 .send(response);
         }

         next();
     }
 }
