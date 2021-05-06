import { IProduct } from "../../../types/interfaces/product";

export interface IProductState {
    products : IProduct[];
    status : string;
}

export enum ProductActionTypes {
    PRODUCT_LOAD = "PRODUCT_LOAD",
    PRODUCT_LOAD_SUCCESS = "PRODUCT_LOAD_SUCCESS",
    PRODUCT_LOAD_FAIL = "PRODUCT_LOAD_FAIL"
}

export interface ProductLoad {
    type : typeof ProductActionTypes.PRODUCT_LOAD
}

export interface ProductLoadSuccess {
    type : typeof ProductActionTypes.PRODUCT_LOAD_SUCCESS,
    products : IProductAnswerSuccess
}

export interface ProductLoadFail {
    type : typeof ProductActionTypes.PRODUCT_LOAD_FAIL
    error : IProductAnswerFail
}

export interface IProductAnswerSuccess {
    products : IProduct[]
}

export interface IProductAnswerFail {
    error : string;
    code : string;
    message : string;
}

export type ProductActions = ProductLoad | ProductLoadSuccess | ProductLoadFail;