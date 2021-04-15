import {Document} from "mongoose";
import {SoftDeleteInterface} from "mongoose-delete"

export interface ISupplier{
    supplier_name: string,
    supplier_address?: string,
    createdAt?: Date
    updatedAt?: Date
}

export interface ISupplierDocument extends ISupplier, Document, SoftDeleteInterface {

}
