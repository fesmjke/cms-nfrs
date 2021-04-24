import {Document,ObjectId,Model} from "mongoose"
import { IUser } from "../../../types/interfaces/user";

export interface IUserDoc extends IUser,Document {
    id : string | ObjectId;
    verifyPassword(password : string) : Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc>{
    
}