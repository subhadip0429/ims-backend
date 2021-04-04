import * as mongoose from "mongoose";

export class Mongodb {
    static async initiate(){
        try{
            mongoose.set('debug', true);
            await mongoose.connect("mongodb://127.0.0.1:27017/ims",{
                useNewUrlParser: true, useUnifiedTopology: true,
                useCreateIndex: true, poolSize : 10
            });
            console.log("Mongo Connected")
        }catch (e) {
            console.log("Error connecting mongo")
        }
    }
}
