import * as ActionTypes from "./types";

export const AddToCart = (product : ActionTypes.IProductInCart) : ActionTypes.CartActions => ({
    type : ActionTypes.CartActionTypes.ADD_TO_CART,
    product
})

export const RemoveFromCart = (product : ActionTypes.IProductRemove) : ActionTypes.CartActions => ({
    type : ActionTypes.CartActionTypes.REMOVE_FROM_CART,
    product
})