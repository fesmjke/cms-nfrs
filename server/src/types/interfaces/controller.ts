import { FastifyRequest,FastifyReply } from "fastify";

export interface IController {
    create(req : FastifyRequest,res : FastifyReply);
    getAll(req : FastifyRequest,res : FastifyReply);
    getById(req : FastifyRequest,res : FastifyReply);
    updateById(req : FastifyRequest,res : FastifyReply);
    deleteById(req : FastifyRequest,res : FastifyReply);
}