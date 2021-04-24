import { FastifyRequest,FastifyReply } from "fastify";

export interface IAuthController {
    logIn(request : FastifyRequest,reply : FastifyReply);
    logOut(request : FastifyRequest,reply : FastifyReply);
}