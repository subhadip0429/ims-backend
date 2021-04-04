import {NextFunction, Request, Response} from "express";

export function handle_logged_user(request:Request, response:Response, next:NextFunction) {
    if(request.user){
        // @ts-ignore
        request.loggedUser = request.user;
    }
    next();
}
