import {model, Schema} from "mongoose";
import * as softDeletePlugin from "mongoose-delete";
import {IProductDocument} from "./typing";

const ProductSchema:Schema<IProductDocument> = new Schema<IProductDocument>({
    product_name:{type: String, required: true},
    composition:{type: String},
},{
    timestamps: true
})

ProductSchema.plugin(softDeletePlugin,{ overrideMethods: true, deletedAt: true });


export const Product: softDeletePlugin.SoftDeleteModel<IProductDocument> = model<IProductDocument, softDeletePlugin.SoftDeleteModel<IProductDocument>>('Product',ProductSchema,"product");

