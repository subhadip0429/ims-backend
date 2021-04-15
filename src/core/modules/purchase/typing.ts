import {MongooseObjectID} from "@global/types";
import {Document} from "mongoose";
import {IUserDocument} from "@modules/user/typing";
import {ISupplierDocument} from "@modules/supplier/typing";



export interface IPurchase{
    bill_no: string,
    bill_date: Date,
    supplier_name: string,
    supplier_id: (MongooseObjectID | ISupplierDocument),
    total_quantity:number,
    total_amount: number,
    net_amount: number,
    createdBy?: (MongooseObjectID | IUserDocument),
    createdAt?: Date
    updatedAt?: Date
}



export interface IPurchaseDocument extends IPurchase, Document {

}



