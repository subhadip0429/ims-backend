import {Singleton} from "@decorators";
import {Supplier} from "./supplier.model";
import {ISupplier, ISupplierDocument} from "./typing";
import {Service} from "@core/service";

@Singleton
export  class SupplierService extends Service<ISupplier>{
    async create(supplier_name:string,supplier_address:string = null):Promise<ISupplierDocument>{
        const supplier=new Supplier({
            supplier_name
        });
        if(supplier_address){
            supplier.supplier_address=supplier_address ;
        }
        return  supplier.save();

    }

    async createIfNotExist(supplier_name:string):Promise<ISupplierDocument>{
        let supplier=await this.findOne({supplier_name});
        if(!supplier){
            supplier=await this.create(supplier_name);
        }
        return supplier;
    }

    async findOne(query:any={},project:any = {}):Promise<ISupplierDocument>{
        return Supplier.findOne(query, project).exec();
    }
}
