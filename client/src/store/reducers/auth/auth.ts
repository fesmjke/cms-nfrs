import { Reducer } from "react";
import { IAuthState,AuthActionTypes,AuthActions } from "./types";

const initialState : IAuthState = {
    profile : {
        id : '',
        user_name : '',
        name : '',
        last_name : '',
        phone_number : '',
        email : '',
    },
    token : '',
    role : '',
    status : "GUEST",
    error : {
        status : '',
        code : '',
        message : ''
    }
}

const reducer : Reducer<IAuthState,AuthActions> = (state = initialState,action : AuthActions) : IAuthState => {
    switch (action.type){
        case AuthActionTypes.AUTH_LOG_IN:{
            return  {...state, status : "LOADING"}
        }
        case AuthActionTypes.AUTH_LOG_IN_SUCCESS:{
            console.log(action.authAnswer.id);
            return {...state, profile : {...state.profile,id : action.authAnswer.id,},status : "SUCCESS",token : action.authAnswer.token,error : {code : '',message : '',status : 'false'}}
        }
        case AuthActionTypes.AUTH_LOG_IN_FAIL:{
            return {profile : {id : '',email : '',last_name : '',name : '',phone_number : '',user_name : ''},role : '',status : 'GUEST',token : '',error : {code : action.authAnswer.code,status : action.authAnswer.status,message : action.authAnswer.message}}
        }
        default : 
            return state;
    }
}

export default reducer;