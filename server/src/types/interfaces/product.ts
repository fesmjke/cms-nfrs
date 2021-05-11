import { ObjectId } from "mongoose";
import { Entity } from "./entity";

export interface IProduct extends Entity {
    title : string;
    price : string;
    discount: string;
    description: string;
    category : string | ObjectId;
    image_url : string;
    developer : string;
    reviewies : [IReview];
    activation_code : string[];
}

export interface IReview {
    rating : number;
    user_id : string | ObjectId;
    message : string;
}