import * as express from "express";
import * as cors from "cors";
import {Environment} from "@global/types";
import * as http from "http";
import {PassportAuth} from "@services/AuthService";
import {Mongodb} from "@services/Database";
import {MainRouter} from "@core/router";

export class Server {
    private readonly app:express.Application = null;
    private readonly server:http.Server = null;
    constructor(private readonly port:number,private readonly env:Environment = "development") {
        this.app = express();
        this.server = http.createServer(this.app);
    }

    async bootstrap():Promise<void> {
        //middlewares
        this.app.use(express.json({limit: '1gb'}));
        this.app.use(express.urlencoded({ extended: false,limit: '1gb'}));
        this.app.use(cors());

        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods","*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, APP-SESSION-ID, APP-VERSION");
            next();
        });

        //database
        await Mongodb.initiate();

        //Auth
        PassportAuth.initiate(this.app);

        //Routers
        this.app.all('/health',((req, res) => res.send("up")));
        this.app.use(MainRouter.publicRoutes());
        this.app.use(PassportAuth.authenticate('jwt', {session : false}),PassportAuth.handleLoggedUser,MainRouter.privateRoutes());

    }

    async run():Promise<void> {
        await this.bootstrap();
        this.server.listen(this.port, () => {
            console.log("I am listening!!", this.port);
        })
    }
}
