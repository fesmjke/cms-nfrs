import { Document, ObjectId,Model } from "mongoose";
import { ICategory } from "../../../types/interfaces/category";

export interface ICategoryDoc extends ICategory,Document {
    id : string | ObjectId;
}

export interface ICategoryModel extends Model<ICategoryDoc>{
    
}