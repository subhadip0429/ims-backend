import {Request} from "express";
import {Controller} from "@core/controller";
import {IController} from "@core/typing";
import {PurchaseService} from "./purchase.service";
import {response_handler} from "@helpers";
import {HTTP_STATUS} from "@global/types";

export class PurchaseController extends Controller implements IController {
    static async addPurchase(payload,request:Request){
        const {bill_no,bill_date,supplier_name,product_list}=payload;
        const createdBy=request.loggedUser;
        const result=await new PurchaseService().add(bill_no,bill_date,supplier_name,createdBy,product_list);
        return response_handler(HTTP_STATUS.CREATED,"Purchase Added",result);
    }

    static getPurchaseBill(request:Request){

    }
}
