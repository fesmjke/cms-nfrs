import { RouteOptions } from "fastify";
import { IAuthController } from "../../types/interfaces/auth-controller";

abstract class AuthRoute {
    protected _controller : IAuthController;
    protected _rootLabel : string;

    constructor(rootLabel : string,controller : IAuthController) {
        this._rootLabel = rootLabel;
        this._controller = controller;
    }

    public abstract getRouters() : RouteOptions[];
}

export default AuthRoute;