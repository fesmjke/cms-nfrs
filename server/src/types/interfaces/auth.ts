import { ObjectId } from "mongoose";
import { Entity } from "./entity";

export interface IAuth extends Entity {
    user_id : string | ObjectId;
    status : string;
    token : string;
}

export interface ILogOut {
    authId : string;
}

export interface ILogIn{
    email : string;
    password : string;
}