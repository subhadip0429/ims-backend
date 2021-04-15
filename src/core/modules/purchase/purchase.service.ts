import {Singleton} from "@decorators";
import {SupplierService} from "@modules/supplier";
import {PurchaseProductService} from "@modules/purchase_product";
import {Purchase} from "./purchase.model";
import {IPurchaseDocument} from "./typing";
import {IUserDocument} from "@modules/user";
import {Service} from "@core/service";


@Singleton
export class PurchaseService extends Service<IPurchaseDocument>{
    constructor() {
        super();
        this.setModel(Purchase);
    }
    async add(bill_no:string, bill_date:string, supplier_name:string, createdBy:IUserDocument, product_list:any[]):Promise<IPurchaseDocument>{
        const billDate = new Date(bill_date);
        const supplierService=new SupplierService();
        const purchaseProductService=new PurchaseProductService();
        const supplier=await supplierService.addIfNotExist(supplier_name);
        const products=await purchaseProductService.addMultiple(product_list);
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
