import {Router} from "@core/router";
import {Router as ExpressRouter} from "express";
import {PurchaseController} from "@modules/purchase/purchase.controller";
import {handle_request} from "@middlewares";
import {validate_request} from "@middlewares";
import {initializeNewExpressRouter} from "@helpers";



export class PurchaseRouter extends Router{
    static publicRoutes():ExpressRouter{
        const router = initializeNewExpressRouter();
        return router ;
    }

    static privateRoutes():ExpressRouter{
        const router = initializeNewExpressRouter();
        router.post('/', validate_request({
            body: ["bill_no","bill_date","supplier_name","product_list"]
        }) ,handle_request(PurchaseController.addPurchase));
        return router ;
    }

}
