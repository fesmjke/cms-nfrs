import { FastifyRequest } from "fastify";
import { ObjectId } from "mongoose";
import { IOrder } from "../interfaces/order";

export type PostOrderRequest = FastifyRequest<{
    Body : IOrder;
}>

export type GetOrderIdRequest = FastifyRequest<{
    Params : OrderRequestURL
}>

export type DeleteOrderIdRequest = FastifyRequest<{
    Params : OrderRequestURL
}>

export type UpdateOrderRequest = FastifyRequest<{
    Body : IOrderUpdate,
    Params : OrderRequestURL
}>

interface IOrderUpdate {
    status : string;
}

interface OrderRequestURL {
    id : string | number | ObjectId;
}