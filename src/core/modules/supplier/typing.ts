import {Document} from "mongoose";

interface ISupplierBase{
    supplier_name: string,
    supplier_address?: string,
    createdAt?: Date
    updatedAt?: Date
}

export interface ISupplier extends ISupplierBase, Document {

}