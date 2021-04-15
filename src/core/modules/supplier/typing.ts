import {Document} from "mongoose";

export interface ISupplier{
    supplier_name: string,
    supplier_address?: string,
    createdAt?: Date
    updatedAt?: Date
}

export interface ISupplierDocument extends ISupplier, Document {

}
