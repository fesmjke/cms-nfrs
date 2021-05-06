import { combineReducers } from "redux";
import auth from "./auth";
import category from "./categories";
import product from "./product"
import cart from "./cart"

export default combineReducers({
    auth,
    category,
    product,
    cart
})