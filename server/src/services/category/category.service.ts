import { IService } from "../../types/interfaces/service";
import {categoryModel,CategoryModel} from "../../model/category/category.model";
import { ICategory } from "../../types/interfaces/category";
import { ObjectId } from "mongoose";

class CategoryService implements IService{
    private _categoryModel : CategoryModel;

    constructor(categoryModel : CategoryModel){
        this._categoryModel = categoryModel;
    }

    create = async (category : ICategory) : Promise<ICategory> => {
        return await this._categoryModel.create(category);
    }

    getAll = async () : Promise<ICategory[]> => {
        return await this._categoryModel.getAll();
    }

    getById = async (id : string | number | ObjectId) : Promise<ICategory | null> => {
        return await this._categoryModel.getById(id);
    }

    updateById = async (id : string | number | ObjectId,updatedCategory : ICategory) : Promise<ICategory | null> => {
        return await this._categoryModel.updateById(id,updatedCategory);
    }

    deleteById = async (id : string | number | ObjectId) : Promise<ICategory | null> => {
        return await this._categoryModel.deleteById(id);
    }
}

const categoryService = new CategoryService(categoryModel)

export {
    categoryService,
    CategoryService
}