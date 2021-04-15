import {model, Schema, Model} from "mongoose";
import {IProductDocument} from "./typing";

const ProductSchema:Schema<IProductDocument> = new Schema<IProductDocument>({
    product_name:{type: String, required: true},
    composition:{type: String},
},{
    timestamps: true
})


export const Product:Model<IProductDocument> = model<IProductDocument>('Product',ProductSchema,"product");

