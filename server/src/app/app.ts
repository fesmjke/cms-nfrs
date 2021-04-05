import Fastify,{FastifyInstance,RouteOptions} from "fastify";
import Joi from "joi";

class ApplicationService {
    private _app : FastifyInstance;
    
    constructor() {
        this._app = Fastify({logger : true});
        this._app.setValidatorCompiler(({schema})=>data=> Joi.compile(schema).validate(data));
        // this._app.setSchemaErrorFormatter((errors,data) => {
        //     console.error({err : errors},'Validation failed');
        //     console.error(data);
        //     return new Error()
        // })
        // this._app.addContentTypeParser() // later
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