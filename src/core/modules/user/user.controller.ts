import {Request, Response} from "express";
import {Controller} from "@core/controller";
import {UserService} from "@modules/user/user.service";
import {HTTP_STATUS} from "@global/types";
import {response_handler} from "@helpers";

export class UserController extends Controller {
    static async create(requestPayload, request:Request){
        let {name, email, password, role} = requestPayload;
        let createdBy = request.loggedUser;
        try{
            let data = await new UserService().add(name, email, password, role, createdBy);
            return response_handler(HTTP_STATUS.CREATED,"User registered successfully",data)
        }catch (e) {
            if(e.code == 11000){
             return response_handler(HTTP_STATUS.BAD_REQUEST, "User is already registered");
            }
            throw e;
        }
    }

    static async authenticate(requestPayload){
        let {email, password} = requestPayload;
        let data = await new UserService().authenticate(email, password);
        return response_handler(HTTP_STATUS.SUCCESS,"User authenticated successfully", data);
    }

    static getUser(requestPayload,request:Request){
        // console.log("controller",request.params)
        return response_handler(HTTP_STATUS.SUCCESS,"Details of Current Logged User", request.loggedUser);
    }

    static async updatePermissions(requestPayload){
        let {id:user_id, permission_list} = requestPayload;
        await new UserService().updatePermissions(user_id, permission_list);
        return response_handler(HTTP_STATUS.SUCCESS, "Permission list updated successfully");
    }
}
