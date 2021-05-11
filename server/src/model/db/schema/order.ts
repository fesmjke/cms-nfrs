import { model, Schema } from "mongoose";
import { IOrderDoc, IOrderModel } from "../docs/order.doc";

const OrderSchema = new Schema<IOrderDoc,IOrderModel>({
    user_id : {type : Schema.Types.ObjectId,ref : 'User',required : false},
    name : {type : String,required : true},
    last_name : {type : String,required : true},
    email : {type : String,required : true},
    total_price : {type : String,required : true},
    products : [{type : String,required : true}],
    status : {type : String,required : true},
},{versionKey : false});

export const Order = model<IOrderDoc>("Order",OrderSchema);