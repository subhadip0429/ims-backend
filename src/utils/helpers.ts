import {HTTP_STATUS_CODE} from "@global/types";
import {ResponseMessage} from "@services/MessageService";
import {Router} from "express";
import {Config} from "@utils/config";

export function response_handler (status:HTTP_STATUS_CODE, message:string, data:any = null) {
    return new ResponseMessage(status, message, data);
}

export function array_wrap(data :any):any[]{
    if(!Array.isArray(data)){
        data = [data];
    }
    return data;
}

export function initializeNewExpressRouter(){
    return Router();
}

export function config(path){
    const pathArray = path.split('.');
    const basePath = pathArray.unshift();
    const key = pathArray.join(".");
    const configInstance = new Config(basePath);
    return configInstance.get(key);
}
