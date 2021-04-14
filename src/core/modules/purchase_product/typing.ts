import {MongooseObjectID} from "@global/types";
import {IProduct} from "@modules/product/typing";
import {IPurchase} from "@modules/purchase/typing";
import {Document} from "mongoose";

interface IPurchaseProductBase{
    product_id : (MongooseObjectID | IProduct),
    product_name : string,
    batch_no : string,
    purchase_id : (MongooseObjectID | IPurchase),
    expiry : Date,
    quantity : number ,
    unit_buying_price:number,
    unit_selling_price:number,
    createdAt?: Date
    updatedAt?: Date

}

export interface IPurchaseProduct extends IPurchaseProductBase, Document {

}