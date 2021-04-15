import {Document} from "mongoose";
import {IService} from "@core/typing";

export class Service<T = any> extends Document implements IService{

}
