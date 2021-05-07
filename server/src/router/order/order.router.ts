import { RouteOptions } from "fastify";
import { orderController } from "../../controllers/order/order.controller";
import { IController } from "../../types/interfaces/controller";
import Route from "../core/route";

class OrderRouter extends Route{
    private getOrdersRoute : RouteOptions;
    private getOrderRoute : RouteOptions;
    private postOrderRoute : RouteOptions;
    private putOrderRoute : RouteOptions;
    private deleteOrderRoute : RouteOptions;

    constructor(rootLabel : string,productController : IController){
        super(rootLabel,productController);

        this.getOrdersRoute = { method : "GET",url : `/api/${this._rootLabel}`,handler : this._controller.getAll };
        this.getOrderRoute = {method : "GET",url : `/api/${this._rootLabel}:id`,handler : this._controller.getById};
        this.postOrderRoute = {method : "POST",url : `/api/${this._rootLabel}`,handler : this._controller.create};
        this.putOrderRoute = { method : "PUT", url : `/api/${this._rootLabel}/:id`, handler : this._controller.updateById }
        this.deleteOrderRoute = { method : "DELETE", url : `/api/${this._rootLabel}/:id`, handler : this._controller.deleteById }
    }

    public getRouters() : RouteOptions[] {
        return [this.getOrdersRoute,this.getOrderRoute,this.postOrderRoute,this.putOrderRoute,this.deleteOrderRoute]
    }
}

const orderRoute = new OrderRouter("order",orderController);

export default orderRoute;