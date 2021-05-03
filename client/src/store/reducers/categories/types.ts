import {ICategory} from "../../../types/interfaces/category";

export interface ICategoriesState {
    categories : ICategory[];
    status : string;
}

export enum CategoriesActionTypes {
    CATEGORY_LOAD = "CATEGORY_LOAD",
    CATEGORY_LOAD_SUCCESS = "CATEGORY_LOAD_SUCCESS",
    CATEGORY_LOAD_FAIL = "CATEGORY_LOAD_FAIL"
}

export interface CategoryLoad {
    type : typeof CategoriesActionTypes.CATEGORY_LOAD
}

export interface CategoryLoadSuccess {
    type : typeof CategoriesActionTypes.CATEGORY_LOAD_SUCCESS,
    categories : ICategoryAnswerLoadSuccess
}

export interface CategoryLoadFail {
    type : typeof CategoriesActionTypes.CATEGORY_LOAD_FAIL,
    error : ICategoryAnswerLoadFail
}

export interface ICategoryAnswerLoadFail {
    error : string;
    code : string;
    message : string;
}

export interface ICategoryAnswerLoadSuccess {
    categories : ICategory[]
}

export type CategoriesActions = CategoryLoad | CategoryLoadSuccess | CategoryLoadFail;