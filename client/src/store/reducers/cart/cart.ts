import { stat } from "fs";
import { Reducer } from "react";
import { CartActionTypes,CartActions, ICartState } from "./types";

const initialCartState : ICartState = {
    cart : []
}

const reducer : Reducer<ICartState,CartActions> = (state = initialCartState,action : CartActions) : ICartState => {
    switch(action.type){
        case CartActionTypes.ADD_TO_CART:{
            state.cart.push(action.product);
            return {...state}
        }
        case CartActionTypes.REMOVE_FROM_CART:{
            const pos = state.cart.map((product) => {return product.id}).indexOf(action.product.id);
            
            const newArr = [...state.cart.slice(0,pos),...state.cart.slice(pos+1,state.cart.length)];

            state.cart = newArr;

            return state;
        }
        default:
            return state;
    }
}

export default reducer;