import {Singleton} from "@decorators";
import {PurchaseProduct} from "./purchase-product.model";
import {IPurchaseProduct, IPurchaseProductDocument} from "./typing";
import {ProductService} from "@modules/product";
import {GST_RATE} from "@global/types";
import {Service} from "@core/service";


@Singleton
export class PurchaseProductService extends Service<IPurchaseProduct>{
    async create(product_id:string,product_name:string,batch_no:string,purchase_id:string,expiry:string,quantity:number,unit_buying_price:number,unit_selling_price:number):Promise<IPurchaseProductDocument> {
        const expiry_date=new Date(expiry);
        const purchaseProduct = new PurchaseProduct({
                product_id,
                product_name,
                batch_no,
                purchase_id,
                expiry:expiry_date,
                quantity,
                unit_buying_price,
                unit_selling_price,
            }
        )
        return purchaseProduct.save();
    }


    async createMultiple(product_list:any[]):Promise<IPurchaseProductDocument[]>{
        const productService=new ProductService();
        return Promise.all(product_list.map(async product =>{
            const productItem=await productService.createIfNotExist(product.product_name);
            return  this.create(productItem._id,productItem.product_name,product.batch_no,product.purchase_id,product.expiry,product.quantity,product.unit_buying_price,product.unit_selling_price);
        }));
    }

    calculateTotalAmount(products : IPurchaseProductDocument[]){
        const netAmount=products.reduce((sum,product) => sum+=product.quantity*product.unit_buying_price,0);
        const totalAmount=netAmount+(netAmount*GST_RATE);
        return {netAmount,totalAmount,product_count:products.length};
    }
}
