import {model, Schema, Model} from "mongoose";
import {ISupplier, ISupplierDocument} from "@modules/supplier/typing";

const SupplierSchema:Schema<ISupplierDocument> = new Schema<ISupplierDocument>({
    supplier_name:{type: String, required: true},
    supplier_address:{type: String}
},{
    timestamps: true
})

export const Supplier:Model<ISupplierDocument> = model<ISupplierDocument>('Supplier',SupplierSchema,"supplier");

