import {Singleton} from "@utils/decorators/singleton.decorator";
import {Supplier} from "@modules/supplier/supplier.model";
import {ISupplier} from "@modules/supplier/typing";

@Singleton
export  class SupplierService{
    async create(supplier_name:string,supplier_address:string = null):Promise<ISupplier>{
        const supplier=new Supplier({
            supplier_name
        });
        if(supplier_address){
            supplier.supplier_address=supplier_address ;
        }
        return  supplier.save();

    }

    async createIfNotExist(supplier_name:string):Promise<ISupplier>{
        let supplier=await this.findOne({supplier_name});
        if(!supplier){
            supplier=await this.create(supplier_name);
        }
        return supplier;
    }

    async findOne(query:any={},project:any = {}):Promise<ISupplier>{
        return Supplier.findOne(query, project).exec();
    }
}