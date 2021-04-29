import Fastify,{FastifyInstance,RouteOptions} from "fastify";
import multer from 'fastify-multer';
import path from "path";
import fastifyStatic from "fastify-static";
import Joi from "joi";

class ApplicationService {
    private _app : FastifyInstance;
    
    constructor() {
        this._app = Fastify({logger : true});
        this._app.setValidatorCompiler(({schema})=>data=> Joi.compile(schema).validate(data));
        this._app.register(multer.contentParser);
        this._app.register(fastifyStatic,{
            root : path.join(process.cwd(),'dist/public'),
            prefix : '/api/static/'
        });
    }

    public setRouter(router : RouteOptions[]) {
        router.forEach(route => {
            this._app.route(route); 
        }); // check later
    }

    public getApp() : FastifyInstance {
        return this._app;
    }
}

export default ApplicationService;