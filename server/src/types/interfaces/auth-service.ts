import { FastifyReply } from "fastify";
import { ILogIn,ILogOut,IAuth } from "./auth";

export interface IAuthService{
    logIn(logIn : ILogIn,reply : FastifyReply) : Promise<IAuth | null | object>;
    logOut(logOut : ILogOut,reply : FastifyReply) : Promise<IAuth | null>;
}