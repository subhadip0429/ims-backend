import {Document} from "mongoose";


interface IProductBase{
    product_name: string,
    composition?: string,
    createdAt?: Date
    updatedAt?: Date

}

export interface IProduct extends IProductBase, Document {

}