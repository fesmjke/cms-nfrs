import { ILogIn,ILogOut,IAuth } from "./auth";

export interface IAuthService{
    logIn(logIn : ILogIn) : Promise<IAuth | null | object>;
    logOut(logOut : ILogOut) : Promise<IAuth | null>;
}