import {model, Schema, Types, Model} from "mongoose";
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
})

export const PurchaseProduct:Model<IPurchaseProductDocument> = model<IPurchaseProductDocument>("PurchaseProduct",PurchaseProductSchema,"purchase_product");
