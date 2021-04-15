import {Singleton} from "@decorators";
import {Product} from "./product.model";
import {IProduct, IProductDocument} from "./typing";
import {Service} from "@core/service";


@Singleton
export  class ProductService extends Service<IProduct>{
    async create(product_name:string,composition:string = null):Promise<IProductDocument>{
        const product=new Product({
            product_name
        });
        if(composition){
            product.composition=composition;
        }
        return  product.save();

    }

async createIfNotExist(product_name:string):Promise<IProductDocument>{
        let product=await this.findOne({product_name});
        if(!product){
            product=await this.create(product_name);
        }
        return product;
    }

    async findOne(query={},project = {}):Promise<IProductDocument>{
        return Product.findOne(query, project).exec();
    }

   async find(query, project): Promise<IProductDocument> {
        return Promise.resolve(undefined);
    }
}
