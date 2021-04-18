import { FastifyRequest } from "fastify";
import { ObjectId } from "mongoose";
import { IUser } from "../interfaces/user";

export type PostUserRequest = FastifyRequest<{
    Body : IUser
}>

export type GetUserIdRequest = FastifyRequest<{
    Params : UserRequestURL
}>

export type DeleteUserIdRequest = FastifyRequest<{
    Params : UserRequestURL
}>

export type UpdateUserRequest = FastifyRequest<{
    Body : IUserUpdate,
    Params : UserRequestURL
}>

interface IUserUpdate {
    user_name? : string,
    name? : string,
    last_name? : string,
    phone_number? : string
}

interface UserRequestURL {
    id : string | number | ObjectId;
}