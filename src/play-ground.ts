import {Application} from "express";
import {Product} from "@modules/product/product.model"
export class PlayGround {
    constructor(private readonly app: Application) {
        this.routes(app);
    }

    routes(app: Application){
        app.all('/play',async (req, res) => {
           // let product = await Product.findById("607882c0820aa93a8815e9f2");
           // product.delete();
            let count = await Product.findDeleted();

            res.send({count});
        })
    }

}
