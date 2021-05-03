import { combineReducers } from "redux";
import auth from "./auth";
import category from "./categories"

export default combineReducers({
    auth,
    category
})