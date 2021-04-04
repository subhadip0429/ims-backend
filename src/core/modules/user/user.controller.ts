import {Request, Response} from "express";
import {BaseController} from "@core/controller";
import {UserService} from "@modules/user/user.service";
import {HTTP_STATUS} from "@global/types";
import {response_handler} from "@helpers";

export class UserController extends BaseController {
    static async create(request:Request){
        let {name, email, password, role} = request.body;
        let createdBy = request.loggedUser;
        try{
            let data = await new UserService().create(name, email, password, role, createdBy);
            return response_handler(HTTP_STATUS.CREATED,"User registered successfully",data)
        }catch (e) {
            if(e.code == 11000){
             return response_handler(HTTP_STATUS.BAD_REQUEST, "User is already registered");
            }
            throw e;
        }
    }

    static async authenticate(request:Request){
        let {email, password} = request.body;
        let data = await new UserService().authenticate(email, password);
        return response_handler(HTTP_STATUS.SUCCESS,"User authenticated successfully", data);
    }

    static getUser(request:Request){
        return response_handler(HTTP_STATUS.SUCCESS,"Details of Current Logged User", request.loggedUser);
    }

    static async updatePermissions(request:Request){
        let {id:user_id} = request.params;
        let {permission_list} = request.body;
        await new UserService().updatePermissions(user_id, permission_list);
        return response_handler(HTTP_STATUS.SUCCESS, "Permission list updated successfully");
    }
}
