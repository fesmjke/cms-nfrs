import express from "express";
import http from "http";
import { IServerConfiguration } from "../types/interfaces/server-configuration";

class HttpServer {
    private _http : http.Server;
    private _configuration : IServerConfiguration;

    constructor(application : express.Application,serverConfiguration : IServerConfiguration) {
        this._http = http.createServer(application);
        this._configuration = serverConfiguration;
    }

    public async startServerAsync() : Promise<http.Server> {
        this._http.listen(this._configuration.port);

        return this._http;
    }
}

export default HttpServer;