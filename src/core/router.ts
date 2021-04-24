import {Router as ExpressRouter } from "express";
import {UserRouter} from "@modules/user";
import {initializeNewExpressRouter} from "@helpers";
import {PurchaseRouter} from "@modules/purchase";
import {PurchaseProductRouter} from "@modules/purchase_product/purchase-product.router";

export class MainRouter{
    static privateRoutes():ExpressRouter{
        let privateRouter:ExpressRouter = initializeNewExpressRouter();
        privateRouter.use('/user', UserRouter.privateRoutes());
        privateRouter.use('/purchase',PurchaseRouter.privateRoutes());
        privateRouter.use('/purchase-product',PurchaseProductRouter.privateRoutes());
        return privateRouter;
    }

    static publicRoutes():ExpressRouter{
        let publicRouter:ExpressRouter = initializeNewExpressRouter();
        publicRouter.use('/user', UserRouter.publicRoutes());
        publicRouter.use('/purchase',PurchaseRouter.publicRoutes());
        publicRouter.use('/purchase-product',PurchaseProductRouter.privateRoutes());
        return publicRouter;
    }
}
