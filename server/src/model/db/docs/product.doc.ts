import { Document, ObjectId,Model } from "mongoose";
import { IProduct } from "../../../types/interfaces/product";

export interface IProductDoc extends IProduct,Document{
    id : string | ObjectId;
}

export interface IProductModel extends Model<IProductDoc>{

}