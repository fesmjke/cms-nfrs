import { Router } from "express";
import { IController } from "../../types/interfaces/controller";

abstract class Route {
    private _router : Router;
    private _controller : IController;
    private _rootLabel : string;

    constructor(rootLabel : string,controller : IController) {
        this._rootLabel = rootLabel;
        this._controller = controller;
        this._router = Router();
    }

    public compose() : Router {
        this._router.post(`/api/${this._rootLabel}/create`,this._controller.create);
        this._router.get(`/api/${this._rootLabel}/`,this._controller.getAll);
        this._router.get(`/api/${this._rootLabel}/:id`,this._controller.getById);
        this._router.delete(`/api/${this._rootLabel}/:id`,this._controller.deleteById);
        this._router.put(`/api/${this._rootLabel}/:id`,this._controller.updateById);
        return this._router;
    }
}

export default Route;

/*

    Route <- Controller
    Controller <- Service
    Service <- Model(DB)

*/