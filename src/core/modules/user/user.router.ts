import {Router as ExpressRouter} from "express";
import {UserController} from "./user.controller";
import {handle_request} from "@middlewares";
import {validate_request} from "@middlewares";
import {initializeNewExpressRouter} from "@helpers";
import {verify_admin} from "@utils/middlewares/verify-admin.middleware";

export class UserRouter {
    static publicRoutes():ExpressRouter{
        const router = initializeNewExpressRouter();
        router.post('/', validate_request({
            body: ["name","email","password","role"]
        }) ,handle_request(UserController.create));

        router.post('/auth', validate_request({
            body: ["email", "password"]
        }), handle_request(UserController.authenticate));
        return router;
    }

    static privateRoutes():ExpressRouter{
        const router = initializeNewExpressRouter();

        router.get('/me',handle_request(UserController.getUser));

        router.put('/',verify_admin,validate_request({
            body: ["permission_list"]
        }), handle_request(UserController.updatePermissions));
        return router;
    }
}
