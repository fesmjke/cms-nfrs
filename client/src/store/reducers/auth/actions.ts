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