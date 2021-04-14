import {Router} from "express";
export interface IController {

}

export interface IRouter {
    router:Router,
    associate():Router
}

export interface IService {

}

export const GST_RATE=18;
