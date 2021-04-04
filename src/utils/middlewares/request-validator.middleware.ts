import {Request, Response, NextFunction} from "express";
import {ResponseMessage} from "@services/MessageService";
export function validate_request(validator:{body?: string[], query?: string[]}) {
    return function (request:Request, response:Response, next:NextFunction) {
        let missingProperties = [];
        if(validator.body){
            let requestBody = request.body;
            missingProperties = [...missingProperties, ...validator.body.filter(property => !requestBody[property])];

        }

        if(validator.query){
            let requestQuery = request.query;
            missingProperties = [...missingProperties, ...validator.query.filter(property => !requestQuery[property])]
        }

        if(missingProperties.length){
            new ResponseMessage(400, "Missing these parameters", missingProperties)
                .send(response);
        }

        next();
    }
}
