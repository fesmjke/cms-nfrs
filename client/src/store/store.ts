import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

const initialState = {};

function saveToLocalStorage(state : any){
    try{
        const serState = JSON.stringify(state);
        localStorage.setItem('state',serState);
    } catch(e) {
        console.log(e);
    }
}

function loadFromLocalStorage(){
    try{
        const serState = localStorage.getItem("state");
        if(serState === null) return undefined;
        return JSON.parse(serState)
    }catch(e){
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer,persistedState,applyMiddleware(thunk))

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;