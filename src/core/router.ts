import {Router as ExpressRouter } from "express";
import {UserRouter} from "@modules/user";
import {initializeNewExpressRouter} from "@helpers";

export abstract class BaseRouter{
}

export class Router {
    static privateRoutes():ExpressRouter{
        let privateRouter:ExpressRouter = initializeNewExpressRouter();
        privateRouter.use('/user', UserRouter.privateRoutes());
        return privateRouter;
    }

    static publicRoutes():ExpressRouter{
        let publicRouter:ExpressRouter = initializeNewExpressRouter();
        publicRouter.use('/user', UserRouter.publicRoutes());
        return publicRouter;
    }
}
