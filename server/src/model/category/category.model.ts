import { ObjectId } from "mongoose";
import { ICategory } from "../../types/interfaces/category";
import { Category } from "../db/schema/category.schema";

class CategoryModel {
    create = async (category : ICategory) : Promise<ICategory> => {
        return await Category.create(category);
    }

    getAll = async () : Promise<ICategory[]> => {
       return await Category.find();
    }

    getById = async (id : string | number | ObjectId) : Promise<ICategory | null> => {
        return await Category.findById({_id : id});
    }

    updateById = async (id : string | number | ObjectId,updatedCategory : object) : Promise<ICategory | null> => {
        return await Category.findByIdAndUpdate(id,updatedCategory,{new : true,omitUndefined : true});
    }

    deleteById = async (id : string | number | ObjectId) : Promise<ICategory | null> => {
        return await Category.findByIdAndDelete({_id : id});
    }
}

const categoryModel = new CategoryModel();

export {
    categoryModel,
    CategoryModel
};