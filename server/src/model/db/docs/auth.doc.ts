import { Document,ObjectId,Model } from "mongoose";
import { IAuth } from "../../../types/interfaces/auth";

export interface IAuthDoc extends IAuth,Document{
    id : string | ObjectId;
}

export interface IAuthModel extends Model<IAuthDoc>{
    
}