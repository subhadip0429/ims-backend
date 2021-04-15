import {model, Schema, Types, Model} from "mongoose";
import * as softDeletePlugin from "mongoose-delete";
import {IPurchaseDocument} from "./typing";
const PurchaseSchema:Schema<IPurchaseDocument> = new Schema<IPurchaseDocument>({
    bill_no:{type: String, required: true,unique : true},
    bill_date:{type: Date, required: true},
    supplier_name:{type: String, required: true},
    supplier_id:{type: String, required: true,index : true},
    total_quantity:{type: Number, required: true},
    total_amount:{type: Number, required: true},
    net_amount:{type: Number, required: true},
    createdBy: {type: Types.ObjectId, required: true ,ref:'User'},
},{
    timestamps: true
})

PurchaseSchema.plugin(softDeletePlugin,{ overrideMethods: true, deletedAt: true })

export const Purchase:softDeletePlugin.SoftDeleteModel<IPurchaseDocument> = model<IPurchaseDocument, softDeletePlugin.SoftDeleteModel<IPurchaseDocument>>('Purchase',PurchaseSchema,"purchase");

