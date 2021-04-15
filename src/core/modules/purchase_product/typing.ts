import {Document} from "mongoose";
import {SoftDeleteInterface} from "mongoose-delete"
import {MongooseObjectID} from "@global/types";
import {IProductDocument} from "@modules/product";
import {IPurchaseDocument} from "@modules/purchase";

export interface IPurchaseProduct{
    product_id : (MongooseObjectID | IProductDocument),
    product_name : string,
    batch_no : string,
    purchase_id : (MongooseObjectID | IPurchaseDocument),
    expiry : Date,
    quantity : number ,
    unit_buying_price:number,
    unit_selling_price:number,
    createdAt?: Date
    updatedAt?: Date

}

export interface IPurchaseProductDocument extends IPurchaseProduct, Document, SoftDeleteInterface {

}
