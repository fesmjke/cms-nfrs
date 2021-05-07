import { Document, Model, ObjectId } from "mongoose";
import { IOrder } from "../../../types/interfaces/order";

export interface IOrderDoc extends IOrder,Document{
    id : string | ObjectId;
}

export interface IOrderModel extends Model<IOrderDoc>{
    
}