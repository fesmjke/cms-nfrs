import { IUser } from "../../../types/interfaces/user";

export interface AuthError {
    code : string;
    message : string;
    status : string;
}

export interface IAuthState {
    profile : IUser;
    token : string;
    role : string;
    status : string;
    error? : AuthError
}

export enum AuthActionTypes {
    AUTH_LOG_IN = "AUTH_LOG_IN",
    AUTH_LOG_IN_SUCCESS = "AUTH_LOG_IN_SUCCESS",
    AUTH_LOG_IN_FAIL = "AUTH_LOG_IN_FAIL",
    AUTH_LOG_OUT = "AUTH_LOG_OUT",
    AUTH_LOG_OUT_SUCCESS = "AUTH_LOG_OUT_SUCCESS",
    AUTH_LOG_OUT_FAIL = "AUTH_LOG_OUT_FAIL",
    AUTH_LOAD_USER = "AUTH_LOAD_USER",
    AUTH_LOAD_USER_SUCCESS = "AUTH_LOAD_USER_SUCCESS",
    AUTH_LOAD_USER_FAIL = "AUTH_LOAD_USER_FAIL"
}

export interface AuthLogIn {
    type : typeof AuthActionTypes.AUTH_LOG_IN;
}

export interface AuthLogInSuccess {
    type : typeof AuthActionTypes.AUTH_LOG_IN_SUCCESS;
    authAnswer : IAuthAnswer
}

export interface AuthLogInFail {
    type : typeof AuthActionTypes.AUTH_LOG_IN_FAIL,
    authAnswer : IAuthAnswerError
}

export interface AuthLogOut {
    type : typeof AuthActionTypes.AUTH_LOG_OUT
}

export interface AuthLogOutSuccess {
    type : typeof AuthActionTypes.AUTH_LOG_OUT_SUCCESS,
    authAnswer : IAuthLogOutAnswer
}

export interface AuthLogOutFail {
    type : typeof AuthActionTypes.AUTH_LOG_OUT_FAIL,
    authAnswer : IAuthLogOutAnswerFail
}

export interface AuthLoadUser {
    type : typeof AuthActionTypes.AUTH_LOAD_USER
}

export interface AuthLoadUserSuccess {
    type : typeof AuthActionTypes.AUTH_LOAD_USER_SUCCESS,
    authAnswer : IAuthLoadUserSuccess
}

export interface AuthLoadUserFail {
    type : typeof AuthActionTypes.AUTH_LOAD_USER_FAIL,
    authAnswer : IAuthLoadUserFail
}

export interface IAuthLoadUserSuccess {
    user_name: string;
    name : string;
    last_name : string;
    phone_number : string;
    email : string;
}

export interface IAuthLoadUserFail {
    reason : string;
    code : string;
    error? : string;
}

export interface IAuthAnswer {
    id : string;
    token : string;
    role : string;
    error? : string;
}

export interface IAuthLogOutAnswer {
    id : string,
    message : string;
    error? : string;
}

export interface IAuthLogOutAnswerFail {
    code : string,
    message : string;
    error? : string;
}

export interface IAuthAnswerError {
    code : string;
    message : string;
    status : string;
}

export type AuthActions = AuthLogIn | AuthLogInSuccess | AuthLogInFail | 
                          AuthLogOut | AuthLogOutSuccess | AuthLogOutFail | 
                          AuthLoadUser | AuthLoadUserSuccess | AuthLoadUserFail;