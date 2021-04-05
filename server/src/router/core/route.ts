import { RouteOptions } from "fastify";
import { IController } from "../../types/interfaces/controller";

abstract class Route {
    protected _controller : IController;
    protected _rootLabel : string;

    constructor(rootLabel : string,controller : IController) {
        this._rootLabel = rootLabel;
        this._controller = controller;
    }

    public abstract getRouters() : RouteOptions[];
}

export default Route;

/*

    Route <- Controller
    Controller <- Service
    Service <- Model(DB)

*/