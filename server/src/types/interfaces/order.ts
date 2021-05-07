import { Entity } from "./entity";

export interface IOrder extends Entity{
    user_id : string;
    name : string;
    last_name : string;
    email : string;
    total_price : string;
    status : string;
}

export interface IUpdatedOrder {
    status : string;
}