import {Document} from "mongoose";


export interface IProduct{
    product_name: string,
    composition?: string,
    createdAt?: Date
    updatedAt?: Date

}

export interface IProductDocument extends IProduct, Document {

}
