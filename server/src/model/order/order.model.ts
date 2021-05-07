import { ObjectId } from "mongoose";
import { IOrder, IUpdatedOrder } from "../../types/interfaces/order";
import { Order } from "../db/schema/order";

// rewrite and add new class for user
class OrderModel {
    create = async (order : IOrder) : Promise<IOrder> => {
        return await Order.create(order);
    }
    
    getAll = async () : Promise<IOrder[]> => {
        return await Order.find();
    }

    getById = async (id : string | ObjectId) : Promise<IOrder | null> => {
        return await Order.findById({_id : id});
    }

    updateById = async (id : string | ObjectId,order : IUpdatedOrder) : Promise<IOrder | null> => {
        return await Order.findByIdAndUpdate(id,{status : order.status},{new : true});
    }

    deleteById = async (id : string | ObjectId) : Promise<IOrder | null> => {
        return await Order.findByIdAndDelete({_id : id});
    }
}

const orderModel = new OrderModel();

export {
    orderModel,
    OrderModel
};