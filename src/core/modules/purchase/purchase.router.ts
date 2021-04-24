import {Router as ExpressRouter} from "express";
import {PurchaseController} from "@modules/purchase/purchase.controller";
import {handle_request} from "@middlewares";
import {validate_request} from "@middlewares";
import {initializeNewExpressRouter} from "@helpers";

export class PurchaseRouter{
    static publicRoutes():ExpressRouter{
        const router = initializeNewExpressRouter();
        return router ;
    }

    static privateRoutes():ExpressRouter{
        const router = initializeNewExpressRouter();
        router.post('/', validate_request({
            body: ["bill_no","bill_date","supplier_name","product_list"]
        }) ,handle_request(PurchaseController.addPurchase));

        router.get('/bills',handle_request(PurchaseController.getPurchaseBills));
        router.get('/bill/byid',validate_request({
            body:["id"]
        }),handle_request(PurchaseController.getPurchaseBillByID));
        return router ;

    }

}
