import {Application, NextFunction, Request, Response} from "express";
import {initialize as initializePassport, use as passportUse, session as SessionStrategy, authenticate as passportAuthenticate, AuthenticateOptions} from "passport";
import {ExtractJwt, Strategy, StrategyOptions as JWTStrategyOptions} from "passport-jwt";
import {UserService} from "@modules/user";
export class PassportAuth {

    static initiate(app:Application){
        app.use(initializePassport());
        app.use(SessionStrategy());
        passportUse(PassportAuth.JWTStrategy())
    }

    static authenticate(strategy:string, options:AuthenticateOptions){
        return passportAuthenticate(strategy, options);
    }

    static handleLoggedUser(request:Request, response:Response, next:NextFunction){
        if(request.user){
            // @ts-ignore
            request.loggedUser = request.user;
        }
        next();
    }

    public static JWTStrategy() : Strategy{
        const options:JWTStrategyOptions = {
            jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), ExtractJwt.fromUrlQueryParameter('_token')]),
            secretOrKey : 'secret'
        }
        return new Strategy(options, async (payload, done) =>{
            try{
                const user = await new UserService().findById(payload.user_id).exec()
                if(user){
                    return done(null,user)
                }else{
                    return done(null,false)
                }
            }catch (error) {
                done(error);
            }
        });
    }
}
