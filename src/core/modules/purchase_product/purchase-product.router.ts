import {Router as ExpressRouter} from "express";
import {handle_request} from "@middlewares";
import {validate_request} from "@middlewares";
import {initializeNewExpressRouter} from "@helpers";
import {PurchaseProductController} from "@modules/purchase_product/purchase-product.controller";


export class PurchaseProductRouter{
    static publicRoutes():ExpressRouter{
        const router = initializeNewExpressRouter();
        return router ;
    }

    static privateRoutes():ExpressRouter{
        const router = initializeNewExpressRouter();
        router.get('/bill/:purchase_id',handle_request(PurchaseProductController.getPurchaseBillByID));
        return router ;
    }
}