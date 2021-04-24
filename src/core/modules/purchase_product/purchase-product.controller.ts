import {Request} from "express";
import {Controller} from "@core/controller";
import {IController} from "@core/typing";
import {response_handler} from "@helpers";
import {HTTP_STATUS} from "@global/types";
import {PurchaseProductService} from "@modules/purchase_product/purchase-product.service";


export class PurchaseProductController extends Controller implements IController {
    static async getPurchaseBillByID(payload,request:Request) {
        const {purchase_id} = payload;
        try {
            const purchaseDataById = await new PurchaseProductService().getProductById(purchase_id);
            return response_handler(HTTP_STATUS.SUCCESS,"Purchase Data",purchaseDataById);
        } catch (e) {
            if (e.code == 11000) {
                return response_handler(HTTP_STATUS.BAD_REQUEST, "Issue in finding Data ");
            }
            throw e;
        }
    }
}