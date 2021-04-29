import { model,Schema } from "mongoose";
import { ICategoryDoc, ICategoryModel } from "../docs/category.doc";

const CategorySchema = new Schema<ICategoryDoc,ICategoryModel>({
    title : {type : String,required : true, unique: [true,'That category title is already exists.']},
    description : {type : String,required : true},
    image_path : {type : String,required : true}
},{
    timestamps : true,
    versionKey : false
});

export const Category = model<ICategoryDoc>("Category",CategorySchema);