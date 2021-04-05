import * as fastify from "fastify";
import { IServerConfiguration, } from "../types/interfaces/server-configuration";
import { Server } from "http";

class HttpServer {
    private _configuration : IServerConfiguration;
    private _application : fastify.FastifyInstance;

    constructor(application : fastify.FastifyInstance,serverConfiguration : IServerConfiguration) {
        this._application = application;
        this._configuration = serverConfiguration;
    }

    public async startServerAsync() : Promise<Server> {
        this._application.listen({port : this._configuration.port});
        return this._application.server;
    }
}

export default HttpServer;