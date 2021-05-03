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
            console.log(AuthActionTypes.AUTH_LOG_IN_SUCCESS);
            return {...state, profile : {...state.profile,id : action.authAnswer.id,},status : "SUCCESS",token : action.authAnswer.token,role : action.authAnswer.role,error : {code : '',message : '',status : 'false'}}
        }
        case AuthActionTypes.AUTH_LOG_IN_FAIL:{
            return {profile : {id : '',email : '',last_name : '',name : '',phone_number : '',user_name : ''},role : '',status : 'GUEST',token : '',error : {code : action.authAnswer.code,status : action.authAnswer.status,message : action.authAnswer.message}}
        }
        case AuthActionTypes.AUTH_LOG_OUT:{
            return {...state,status : "LOGOUT_LOADING"}
        }
        case AuthActionTypes.AUTH_LOG_OUT_SUCCESS:{
            state = initialState;
            return {...state}
        }
        case AuthActionTypes.AUTH_LOG_OUT_FAIL:{
            return {...state}
        }
        case AuthActionTypes.AUTH_LOAD_USER:{
            console.log(AuthActionTypes.AUTH_LOAD_USER,state);
            return {...state}
        }
        case AuthActionTypes.AUTH_LOAD_USER_SUCCESS:{
            console.log(AuthActionTypes.AUTH_LOAD_USER_SUCCESS,state)
            return {...state,profile : {id : state.profile.id,last_name : action.authAnswer.last_name,
                    email : action.authAnswer.email,name : action.authAnswer.name,
                    phone_number : action.authAnswer.phone_number,user_name : action.authAnswer.user_name}}
        }
        case AuthActionTypes.AUTH_LOAD_USER_FAIL:{
            console.log(AuthActionTypes.AUTH_LOAD_USER_FAIL,state,action)
            state = initialState;
            return {...state}
        }
        default : 
            return state;
    }
}

export default reducer;