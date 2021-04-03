import express from "express";
import bodyParser from "body-parser";

class ApplicationService {
    private _app : express.Application;

    constructor() {
        this._app = express();
        this._app.use(bodyParser.json())
    }

    public setRouter(router : express.Router) {
        this._app.use(router);
    }

    public getApp() : express.Application {
        return this._app;
    }
}

export default ApplicationService;