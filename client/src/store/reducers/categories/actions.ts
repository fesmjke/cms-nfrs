import * as ActionTypes from "./types";

export const CategoryLoad = () : ActionTypes.CategoriesActions => ({
    type : ActionTypes.CategoriesActionTypes.CATEGORY_LOAD
})

export const CategoryLoadSuccess = (categoryLoadAnswer : ActionTypes.ICategoryAnswerLoadSuccess) => ({
    type : ActionTypes.CategoriesActionTypes.CATEGORY_LOAD_SUCCESS,
    categoryLoadAnswer
})

export const CategoryLoadFail = (categoryLoadFail : ActionTypes.ICategoryAnswerLoadFail) => ({
    type : ActionTypes.CategoriesActionTypes.CATEGORY_LOAD_FAIL,
    categoryLoadFail
})