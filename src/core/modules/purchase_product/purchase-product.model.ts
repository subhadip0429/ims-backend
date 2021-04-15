import {model, Schema, Types} from "mongoose";
import * as softDeletePlugin from "mongoose-delete";

import {IPurchaseProductDocument} from "./typing";

const PurchaseProductSchema:Schema<IPurchaseProductDocument> = new Schema<IPurchaseProductDocument>({
    product_id :{type:Types.ObjectId, required : true, ref : "Product",index : true},
    product_name :{type : String, required : true},
    batch_no : {type: String , required : true , index : true},
    purchase_id : {type:Types.ObjectId, required : true, ref : "Purchase"},
    expiry : {type : Date ,required : true},
    quantity : {type : Number , required : true } ,
    unit_buying_price:{type : Number , required : true } ,
    unit_selling_price:{type : Number , required : true } ,
},{
    timestamps : true ,
});

PurchaseProductSchema.plugin(softDeletePlugin,{ overrideMethods: true, deletedAt: true })

export const PurchaseProduct:softDeletePlugin.SoftDeleteModel<IPurchaseProductDocument> = model<IPurchaseProductDocument, softDeletePlugin.SoftDeleteModel<IPurchaseProductDocument>>("PurchaseProduct",PurchaseProductSchema,"purchase_product");
