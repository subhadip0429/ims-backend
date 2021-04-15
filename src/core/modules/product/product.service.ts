import {Singleton} from "@decorators";
import {Product} from "./product.model";
import {IProduct, IProductDocument} from "./typing";
import {Service} from "@core/service";


@Singleton
export  class ProductService extends Service<IProductDocument, IProduct>{
    constructor() {
        super();
        this.setModel(Product);
    }
    async add(product_name:string,composition:string = null):Promise<IProductDocument>{
        const product = this.builder({
            product_name
        });
        if(composition){
            product.composition=composition;
        }
        return  product.save();

    }

    async addIfNotExist(product_name:string):Promise<IProductDocument>{
        let product=await this.findOne({product_name}).exec();
        if(!product){
            product=await this.add(product_name);
        }
        return product;
    }
}
