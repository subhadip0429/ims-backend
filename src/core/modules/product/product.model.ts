import {model, Schema, Types} from "mongoose";
import {IProduct} from "@modules/product/typing";

const ProductSchema:Schema<IProduct> = new Schema<IProduct>({
    product_name:{type: String, required: true},
    composition:{type: String},
},{
    timestamps: true
})


export const Product = model<IProduct>('Product',ProductSchema,"product");

