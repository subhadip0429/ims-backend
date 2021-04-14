import {model, Schema, Types} from "mongoose";
import {ISupplier} from "@modules/supplier/typing";

const SupplierSchema:Schema<ISupplier> = new Schema<ISupplier>({
    supplier_name:{type: String, required: true},
    supplier_address:{type: String}
},{
    timestamps: true
})

export const Supplier = model<ISupplier>('Supplier',SupplierSchema,"supplier");

