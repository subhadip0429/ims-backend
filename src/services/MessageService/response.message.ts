import {Response} from "express";
import {HTTP_STATUS_CODE} from "@global/types";
type payload = any;
export class ResponseMessage {
    constructor(public readonly status:HTTP_STATUS_CODE,private readonly message:string, private readonly data:payload = null) {}
    toJSON(){
        return {
            code: this.status,
            message: this.message,
            data : this.data
        }
    }
    send(response: Response) {
        response
            .status(this.status)
            .json(this);
    }
}
