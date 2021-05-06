export interface ICartState {
    cart : IProductInCart[]
}

export interface IProductInCart {
    id : string;
    title : string;
    price : string;
    discount : string;
}

export enum CartActionTypes {
    ADD_TO_CART = "ADD_TO_CART",
    REMOVE_FROM_CART = "REMOVE_FROM_CART"
}

export interface CartToAdd {
    type : typeof CartActionTypes.ADD_TO_CART,
    product : IProductInCart
}

export interface CartRemoveFrom {
    type : typeof CartActionTypes.REMOVE_FROM_CART,
    product : IProductRemove
}

export interface IProductRemove {
    id : string;
}

export type CartActions = CartToAdd | CartRemoveFrom;