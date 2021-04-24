import { RouteOptions } from "fastify";
import { authController } from "../../controllers/auth/auth.controller";
import { IAuthController } from "../../types/interfaces/auth-controller";
import { AuthLogInResponce } from "../../types/schema/auth";
import AuthRoute from "../core/auth.route";


class Auth extends AuthRoute {
    private authLogIn : RouteOptions;
    private authLogOut : RouteOptions; 
    
    constructor(rootLabel : string,controller : IAuthController){
        super(rootLabel,controller);
    
        this.authLogIn = {method : "POST", url : `/${this._rootLabel}/login`,schema : {response : AuthLogInResponce}, handler : this._controller.logIn}
        this.authLogOut = {method : "POST", url : `/${this._rootLabel}/logout`, handler : this._controller.logOut}
    }

    getRouters() : RouteOptions[] {
        return [this.authLogIn,this.authLogOut];
    }
}

const authRoute = new Auth("auth",authController);

export default authRoute;