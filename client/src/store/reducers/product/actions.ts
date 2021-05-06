import * as ActionTypes from "./types";

export const ProductLoad = () : ActionTypes.ProductActions => ({
    type : ActionTypes.ProductActionTypes.PRODUCT_LOAD
})

export const ProductLoadSuccess = (productLoadAnswer : ActionTypes.IProductAnswerSuccess) => ({
    type : ActionTypes.ProductActionTypes.PRODUCT_LOAD_SUCCESS,
    productLoadAnswer
})

export const ProductLoadFail = (productLoadAnswer : ActionTypes.IProductAnswerFail) => ({
    type : ActionTypes.ProductActionTypes.PRODUCT_LOAD_FAIL,
    productLoadAnswer
})