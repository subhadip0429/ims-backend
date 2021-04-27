import {Singleton} from "@decorators";
import {PurchaseProduct} from "./purchase-product.model";
import {IPurchaseProduct, IPurchaseProductDocument} from "./typing";
import {ProductService} from "@modules/product";
import {GST_RATE} from "@global/types";
import {Service} from "@core/service";


@Singleton
export class PurchaseProductService extends Service<IPurchaseProductDocument, IPurchaseProduct>{
    constructor() {
        super();
        this.setModel(PurchaseProduct);
    }
    async add(product_id:string,product_name:string,batch_no:string,purchase_id:string,expiry:string,quantity:number,unit_buying_price:number,unit_selling_price:number):Promise<IPurchaseProductDocument> {
        const expiry_date=new Date(expiry);
        const purchaseProduct = this.builder({
                product_id,
                product_name,
                batch_no,
                purchase_id,
                expiry:expiry_date,
                quantity,
                unit_buying_price,
                unit_selling_price,
            });
        return purchaseProduct.save();
    }


    async addMultiple(product_list: Omit<IPurchaseProduct,"product_id" | "purchase_id" | "expiry">[] | {expiry:string}[], purchase_id:string):Promise<IPurchaseProductDocument[]>{
        const productService=new ProductService();
        return Promise.all(product_list.map(async product => {
            const productItem=await productService.addIfNotExist(product.product_name);
            return  this.add(productItem._id,productItem.product_name,product.batch_no,purchase_id, product.expiry,product.quantity,product.unit_buying_price,product.unit_selling_price);
        }));
    }

    calculateTotalAmount(products : IPurchaseProductDocument[]){
        const netAmount=products.reduce((sum,product) => sum+=product.quantity*product.unit_buying_price,0);
        const totalAmount=netAmount+(netAmount*GST_RATE);
        return {netAmount,totalAmount,product_count:products.length};
    }

    async getProductById(purchase_id:string){
        return this.findOne({purchase_id});
    }
}
