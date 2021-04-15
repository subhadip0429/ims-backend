import {model, Schema} from "mongoose";
import * as softDeletePlugin from "mongoose-delete";
import {ISupplierDocument} from "@modules/supplier/typing";

const SupplierSchema:Schema<ISupplierDocument> = new Schema<ISupplierDocument>({
    supplier_name:{type: String, required: true},
    supplier_address:{type: String}
},{
    timestamps: true
});
SupplierSchema.plugin(softDeletePlugin,{ overrideMethods: true, deletedAt: true });

export const Supplier:softDeletePlugin.SoftDeleteModel<ISupplierDocument> = model<ISupplierDocument, softDeletePlugin.SoftDeleteModel<ISupplierDocument>>('Supplier',SupplierSchema,"supplier");

