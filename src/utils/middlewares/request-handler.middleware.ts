import {ResponseMessage} from "@services/MessageService";
import {NextFunction, Request, Response} from "express";

export function handle_request(handlerFunction) {
        return async function (request:Request, response:Response, next:NextFunction){
            try{
                let responseMessage: ResponseMessage = await handlerFunction(request, response, next);
                responseMessage.send(response);
            }catch (e){
                // console.log(e)
                new ResponseMessage(500, "Internal server error")
                    .send(response);
            }
        }
}
