import Route from "../core/route";
import { IController } from "../../types/interfaces/controller";
import { userController } from "../../controllers/user/user.controller";
import { RouteOptions } from "fastify";
import { PostUserSchema,PostUserResponce,GetUserResponce,GetUsersResponce, DeleteUserResponce, UpdateUserResponce } from "../../types/schema/user";

class UserRoute extends Route {
    /**
     Class private fields
    */
     private getUsersRoute : RouteOptions;
     private getUserRoute : RouteOptions;
     private postUserRoute : RouteOptions;
     private putUserRoute : RouteOptions;
     private deleteUserRoute : RouteOptions;
    constructor(rootLabel : string,userController : IController) {
        super(rootLabel,userController);
        
        // later need to refactor
        this.getUsersRoute = { method : "GET",url : `/api/${this._rootLabel}`,schema : {response : GetUsersResponce},handler : this._controller.getAll }
        this.getUserRoute = { method : "GET",url : `/api/${this._rootLabel}/:id`,schema : {response : GetUserResponce},handler : this._controller.getById }
        this.postUserRoute = { method : "POST", 
            url : `/api/${this._rootLabel}`,
            schema : {body : PostUserSchema,response : PostUserResponce},
            handler : this._controller.create}
        this.postUserRoute
        this.putUserRoute = { method : "PUT", url : `/api/${this._rootLabel}/:id`,schema : {response : UpdateUserResponce}, handler : this._controller.updateById }
        this.deleteUserRoute = { method : "DELETE", url : `/api/${this._rootLabel}/:id`,schema : {response : DeleteUserResponce}, handler : this._controller.deleteById }
    }

    public getRouters() : RouteOptions[] {
        return [this.getUsersRoute,this.getUserRoute,this.postUserRoute,this.putUserRoute,this.deleteUserRoute]
    }
}

const userRoute = new UserRoute("user",userController);

export default userRoute;