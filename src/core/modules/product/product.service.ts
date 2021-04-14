import {Singleton} from "@utils/decorators/singleton.decorator";
import {Product} from "@modules/product/product.model";
import {IProduct} from "@modules/product/typing";


@Singleton
export  class ProductService{
    async create(product_name:string,composition:string = null):Promise<IProduct>{
        const product=new Product({
            product_name
        });
        if(composition){
            product.composition=composition;
        }
        return  product.save();

    }

async createIfNotExist(product_name:string):Promise<IProduct>{
        let product=await this.findOne({product_name});
        if(!product){
            product=await this.create(product_name);
        }
        return product;
    }

    async findOne(query:any={},project:any = {}):Promise<IProduct>{
        return Product.findOne(query, project).exec();
    }
}