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
    AUTH_LOG_OUT_FAIL = "AUTH_LOG_OUT_FAIL"
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

export interface IAuthAnswer {
    id : string;
    token : string;
    error? : string;
}

export interface IAuthAnswerError {
    code : string;
    message : string;
    status : string;
}

export type AuthActions = AuthLogIn | AuthLogInSuccess | AuthLogInFail;