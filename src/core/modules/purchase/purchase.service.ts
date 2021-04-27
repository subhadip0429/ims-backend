import {Singleton} from "@decorators";
import {SupplierService} from "@modules/supplier";
import {PurchaseProductService} from "@modules/purchase_product";
import {Purchase} from "./purchase.model";
import {IPurchase, IPurchaseDocument} from "./typing";
import {IUserDocument} from "@modules/user";
import {Service} from "@core/service";


@Singleton
export class PurchaseService extends Service<IPurchaseDocument, IPurchase>{
    constructor() {
        super();
        this.setModel(Purchase);
    }
    async add(bill_no:string, bill_date:string, supplier_name:string, createdBy:IUserDocument, product_list:any[]):Promise<IPurchaseDocument>{
        const billDate = new Date(bill_date);
        const supplierService=new SupplierService();
        const purchaseProductService=new PurchaseProductService();
        const supplier=await supplierService.addIfNotExist(supplier_name);
        const {netAmount,totalAmount,product_count}=purchaseProductService.calculateTotalAmount(product_list);
        const purchase = await this.create({
            bill_no: bill_no,
            bill_date:billDate,
            supplier_name,
            supplier_id:supplier._id,
            total_quantity:product_count,
            total_amount:totalAmount,
            net_amount:netAmount,
            createdBy,
        });

        await purchaseProductService.addMultiple(product_list, purchase._id);
        return purchase;
    }

    async getBills(){
        return await this.find();
    }

    async getPurchaseBillByID(id:string){
       const purchaseProductService=new PurchaseProductService();
       return purchaseProductService.getProductById(id);
    }
}
