import { FastifyRequest } from "fastify";
import { IUser } from "../interfaces/user";

export type PostUserRequest = FastifyRequest<{
    Body : IUser
}>