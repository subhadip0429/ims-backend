import {NextFunction, Request, Response} from "express";
import {response_handler} from "@helpers";
import {HTTP_STATUS} from "@global/types";

export function verify_admin() {
    return function (request:Request, response:Response, next:NextFunction) {
        if(request.isUnauthenticated() || (request.isAuthenticated() && !request.loggedUser.isAdmin())){
            return response_handler(HTTP_STATUS.FORBIDDEN,"Access Denied").send(response);
        }
        next();
    }
}
