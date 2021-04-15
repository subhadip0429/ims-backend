import {Router} from "express";
import {Model} from "mongoose"
export interface IController{

}

export interface IRouter {

}

export interface IService<T = any>{
    _model
    setModel(model:T)
    getModel():T
}
