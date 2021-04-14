import {Singleton} from "@decorators";
import {SupplierService} from "@modules/supplier/supplier.service";
import {PurchaseProductService} from "@modules/purchase_product/purchase-product.service";
import {Purchase} from "@modules/purchase/purchase.model";
import {IPurchase} from "@modules/purchase/typing";
import {IUser} from "@modules/user/typing";
import * as moment from "moment-timezone";


@Singleton
export class PurchaseService{
    async create(bill_no:string,bill_date:string,supplier_name:string,createdBy:IUser,product_list:any[]):Promise<IPurchase>{
        const billDate=moment(bill_date).toDate();
        const supplierService=new SupplierService();
        const purchaseProductService=new PurchaseProductService();
        const supplier=await supplierService.createIfNotExist(supplier_name);
        const products=await purchaseProductService.createMultiple(product_list);
        const {netAmount,totalAmount,product_count}=purchaseProductService.calculateTotalAmount(products);
        const purchase=new Purchase({
            bill_no,
            bill_date:billDate,
            supplier_name,
            supplier_id:supplier._id,
            total_quantity:product_count,
            total_amount:totalAmount,
            net_amount:netAmount,
            createdBy,

        });
        return purchase.save();
    }
}