import {BaseController} from "../../controller";
import {IController} from "../../typing";
import {Request, Response} from "express";
import {PurchaseService} from "@modules/purchase/purchase.service";
import {response_handler} from "@helpers";
import {HTTP_STATUS} from "@global/types";

export class PurchaseController extends BaseController implements IController {
    static async addPurchase(payload,request:Request){
        const {bill_no,bill_date,supplier_name,product_list}=payload;
        const createdBy=request.loggedUser;
        const result=await new PurchaseService().create(bill_no,bill_date,supplier_name,createdBy,product_list);
        return response_handler(HTTP_STATUS.CREATED,"Purchase Added",result);
    }

    static getPurchaseBill(request:Request, response:Response){

    }
}
