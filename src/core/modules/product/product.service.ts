import {Singleton} from "@decorators";
import {Product} from "./product.model";
import {IProductDocument} from "./typing";
import {Service} from "@core/service";


@Singleton
export  class ProductService extends Service<IProductDocument>{
    constructor() {
        super();
        this.setModel(Product);
    }
    async add(product_name:string,composition:string = null):Promise<IProductDocument>{
        const product=new Product({
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
