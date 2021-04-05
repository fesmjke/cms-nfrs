import { IController } from "../../types/interfaces/controller";
import { IService } from "../../types/interfaces/service";
import { userService } from "../../services/user/user.service";
import { FastifyRequest,FastifyReply } from "fastify";
import { PostUserRequest } from "../../types/requests/user";

class UserController implements IController {
    private _userService : IService;

    constructor(userService : IService) { 
        this._userService = userService;
    }

    public create = async (request : PostUserRequest,reply : FastifyReply) => {
        const createdUser = this._userService.create(request.body);
        reply.code(201).header('Content-Type','application/json; charset=utf-8').send(createdUser);
    }

    public getAll = async (request : FastifyRequest,reply : FastifyReply) => {
        console.log(request.body)
        return {hello : "world"}
    }

    public getById = async (request : FastifyRequest,reply : FastifyReply) => {

    }

    public deleteById = async (request : FastifyRequest,reply : FastifyReply) => {

    }

    public updateById = async (request : FastifyRequest,reply : FastifyReply) => {

    }
}

const userController = new UserController(userService);

export {
    userController,
    UserController
};