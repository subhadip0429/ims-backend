import {Router as ExpressRouter } from "express";
import {UserRouter} from "@modules/user";
import {initializeNewExpressRouter} from "@helpers";
import {PurchaseRouter} from "@modules/purchase";

export class MainRouter{
    static privateRoutes():ExpressRouter{
        let privateRouter:ExpressRouter = initializeNewExpressRouter();
        privateRouter.use('/user', UserRouter.privateRoutes());
        privateRouter.use('/purchase',PurchaseRouter.privateRoutes());
        return privateRouter;
    }

    static publicRoutes():ExpressRouter{
        let publicRouter:ExpressRouter = initializeNewExpressRouter();
        publicRouter.use('/user', UserRouter.publicRoutes());
        publicRouter.use('/purchase',PurchaseRouter.publicRoutes());
        return publicRouter;
    }
}
