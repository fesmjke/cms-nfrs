import { FastifyRequest } from "fastify";

export type AuthLogInRequest = FastifyRequest<{
    Body : IAuthLogIn
}>

export type AuthLogOutRequest = FastifyRequest<{
    Body : IAuthLogOut;
}>

interface IAuthLogOut {
    authId : string; 
}

interface IAuthLogIn {
    email : string,
    password : string;
}