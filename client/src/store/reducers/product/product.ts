import { Reducer } from "react";
import { IProductState,ProductActions, ProductActionTypes } from "./types";

const initialProductsState : IProductState = {
    products : [],
    status : '',
}

const reducer : Reducer<IProductState,ProductActions> = (state = initialProductsState,action : ProductActions) : IProductState => {
    switch(action.type){
        case ProductActionTypes.PRODUCT_LOAD:{
            return {...state,status : "PRODUCT_LOAD"};
        }
        case ProductActionTypes.PRODUCT_LOAD_SUCCESS:{
            return {products : action.products.products,status : "PRODUCT_LOADED"}
        }
        default : 
            return state;
    }
}

export default reducer;