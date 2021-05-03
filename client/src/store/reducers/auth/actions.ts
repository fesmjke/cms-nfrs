import * as ActionTypes from "./types";

export const AuthLogIn = () : ActionTypes.AuthActions => ({
    type : ActionTypes.AuthActionTypes.AUTH_LOG_IN
})

export const AuthLogInSuccess = (authAnswer : ActionTypes.IAuthAnswer) : ActionTypes.AuthActions => ({
    type : ActionTypes.AuthActionTypes.AUTH_LOG_IN_SUCCESS,
    authAnswer
})

export const AuthLogInFail = (authAnswer : ActionTypes.IAuthAnswerError) : ActionTypes.AuthActions => ({
    type : ActionTypes.AuthActionTypes.AUTH_LOG_IN_FAIL,
    authAnswer 
})

export const AuthLogOut = () : ActionTypes.AuthActions => ({
    type : ActionTypes.AuthActionTypes.AUTH_LOG_OUT
})

export const AuthLogOutSuccess = (authAnswer : ActionTypes.IAuthLogOutAnswer) : ActionTypes.AuthActions => ({
    type : ActionTypes.AuthActionTypes.AUTH_LOG_OUT_SUCCESS,
    authAnswer
})

export const AuthLogOutFail = (authAnswer : ActionTypes.IAuthLogOutAnswerFail) : ActionTypes.AuthActions => ({
    type : ActionTypes.AuthActionTypes.AUTH_LOG_OUT_FAIL,
    authAnswer
})

export const AuthLoadUser = () : ActionTypes.AuthActions => ({
    type : ActionTypes.AuthActionTypes.AUTH_LOAD_USER
})

export const AuthLoadUserSuccess = (authAnswer : ActionTypes.IAuthLoadUserSuccess) : ActionTypes.AuthLoadUserSuccess => ({
    type : ActionTypes.AuthActionTypes.AUTH_LOAD_USER_SUCCESS,
    authAnswer
})

export const AuthLoadUserFail = (authAnswer : ActionTypes.IAuthLoadUserFail) : ActionTypes.AuthLoadUserFail => ({
    type : ActionTypes.AuthActionTypes.AUTH_LOAD_USER_FAIL,
    authAnswer
})