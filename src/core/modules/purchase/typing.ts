import {MongooseObjectID} from "@global/types";
import {Document} from "mongoose";
import {IUser} from "@modules/user/typing";
import {ISupplier} from "@modules/supplier/typing";



interface IPurchaseBase{
    bill_no: string,
    bill_date: Date,
    supplier_name: string,
    supplier_id: (MongooseObjectID | ISupplier),
    total_quantity:number,
    total_amount: number,
    net_amount: number,
    createdBy?: (MongooseObjectID | IUser),
    createdAt?: Date
    updatedAt?: Date
}



export interface IPurchase extends IPurchaseBase, Document {

}



