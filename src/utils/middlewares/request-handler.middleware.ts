import {NextFunction, Request, Response} from "express";
import {response_handler} from "@helpers";
import {HTTP_STATUS} from "@global/types";

export function handle_request(handlerFunction) {
        return async function (request:Request, response:Response, next:NextFunction){
            try{
                let payload = {...request.params, ...request.query};
                if(Array.isArray(request.body)){
                    payload["body"] = request.body;
                }else{
                    payload = {...payload, ...request.body}
                }

                let responseMessage = await handlerFunction(payload,request, response, next);
                responseMessage.send(response);
            }catch (e){
                console.log(e)
                response_handler(HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error")
                    .send(response);
            }
        }
}
