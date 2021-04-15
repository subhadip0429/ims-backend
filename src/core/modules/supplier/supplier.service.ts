import {Singleton} from "@decorators";
import {Supplier} from "./supplier.model";
import {ISupplierDocument} from "./typing";
import {Service} from "@core/service";

@Singleton
export  class SupplierService extends Service<ISupplierDocument>{
    constructor() {
        super();
        this.setModel(Supplier);
    }
    async add(supplier_name:string,supplier_address:string = null):Promise<ISupplierDocument>{
        const supplier = this.builder({
            supplier_name
        });
        if(supplier_address){
            supplier.supplier_address=supplier_address ;
        }
        return  supplier.save();

    }

    async addIfNotExist(supplier_name:string):Promise<ISupplierDocument>{
        let supplier=await this.findOne({supplier_name}).exec();
        if(!supplier){
            supplier=await this.add(supplier_name);
        }
        return supplier;
    }
}
