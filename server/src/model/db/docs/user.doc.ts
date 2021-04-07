import {Document,ObjectId} from "mongoose"
import { IUser } from "../../../types/interfaces/user";

export interface IUserDoc extends IUser,Document {
    id : string | ObjectId;
}