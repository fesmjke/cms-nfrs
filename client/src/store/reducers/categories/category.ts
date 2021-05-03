import { Reducer } from "react";
import { CategoriesActions, CategoriesActionTypes, ICategoriesState } from "./types";

const initialCategoriesState : ICategoriesState = {
    categories : [],
    status : "",
}

const reducer : Reducer<ICategoriesState,CategoriesActions> = (state = initialCategoriesState,action : CategoriesActions) : ICategoriesState => {
    switch(action.type){
        case CategoriesActionTypes.CATEGORY_LOAD:{
            return {...state,status : "CATEGORY_LOADING"}
        }
        case CategoriesActionTypes.CATEGORY_LOAD_SUCCESS:{
            return {categories : action.categories.categories,status : "CATEGORY_LOADED"}
        }
        case CategoriesActionTypes.CATEGORY_LOAD_FAIL:{
            return {categories : state.categories,status : "CATEGORY_LOAD_FAIL"}
        }
        default : 
            return state;
    }
}

export default reducer;