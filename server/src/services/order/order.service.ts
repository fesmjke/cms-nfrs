import { IService } from "../../types/interfaces/service";
import { ObjectId } from "mongoose";
import { orderModel, OrderModel } from "../../model/order/order.model";
import { IOrder, IUpdatedOrder } from "../../types/interfaces/order";

class OrderService implements IService{
    private _orderModel : OrderModel;

    constructor(orderModel : OrderModel) {
        this._orderModel = orderModel;
    }

    create = async (order : IOrder) : Promise<IOrder> => {
        return await this._orderModel.create(order);
    }
    
    getAll = async () : Promise<IOrder[]> => {
        return await this._orderModel.getAll();
    }
    
    getById = async (id : string | ObjectId) : Promise<IOrder | null> => {
        return await this._orderModel.getById(id);
    }
    
    updateById = async (id : string | ObjectId,updatedOrder : IUpdatedOrder) : Promise<IOrder | null> => {
        return await this._orderModel.updateById(id,updatedOrder);
    }

    deleteById = async (id : string | ObjectId) : Promise<IOrder | null> => {
        return await this._orderModel.deleteById(id);
    }
}

const orderService = new OrderService(orderModel)

export {
    orderService,
    OrderService
}