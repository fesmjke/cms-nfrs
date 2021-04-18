import { IController } from "../../types/interfaces/controller";
import { IService } from "../../types/interfaces/service";
import { userService } from "../../services/user/user.service";
import { FastifyRequest,FastifyReply } from "fastify";
import { PostUserRequest,GetUserIdRequest,DeleteUserIdRequest,UpdateUserRequest } from "../../types/requests/user";
import { ErrorController } from "../error/error.controller";

class UserController implements IController {
    private _userService : IService;
    private _errorController;

    constructor(userService : IService) { 
        this._userService = userService;
        this._errorController = new ErrorController();
    }

    public create = async (request : PostUserRequest,reply : FastifyReply) => {
        try{
            const createdUser = await this._userService.create(request.body);
            reply.code(201).header('Content-Type','application/json; charset=utf-8').send(createdUser);
        }catch(err){
            this._errorController.errorClassifier(err,reply);
        }
    }

    public getAll = async (request : FastifyRequest,reply : FastifyReply) => {
        try{
            const users = await this._userService.getAll();
            reply.code(200).header('Content-Type','application/json; charset=utf-8').send(users);
        }catch(err){
            reply.status(500).send(new Error(err))
        }
    }

    public getById = async (request : GetUserIdRequest,reply : FastifyReply) => {
        try{
            const {id} = request.params;
            const user = await this._userService.getById(id);

            if(user === null){
                reply.code(404).header('Content-Type','application/json; charset=utf-8').send({});
            }else{
                reply.code(200).header('Content-Type','application/json; charset=utf-8').send(user);
            }
        }catch(err) {
            reply.status(500).send(new Error(err))
        }
    }

    public deleteById = async (request : DeleteUserIdRequest,reply : FastifyReply) => {
        try {
            const {id} = request.params;
            const result = await this._userService.deleteById(id);

            if(result === null){
                reply.code(404).header('Content-Type','application/json; charset=utf-8').send({})
            }else{
                reply.code(200).header('Content-Type','application/json; charset=utf-8').send(result);
            }
        }catch(err){
            reply.status(500).send(new Error(err))
        }
    }

    public updateById = async (request : UpdateUserRequest,reply : FastifyReply) => {
        try{
            const {id} = request.params;
            const updatedUser = {user_name : request.body.user_name,
                                name : request.body.name,
                                last_name : request.body.last_name,
                                phone_number : request.body.phone_number};

            const result = await this._userService.updateById(id,updatedUser);
            
            if(result === null){
                reply.code(404).header('Content-Type','application/json; charset=utf-8').send({})
            }else{
                reply.code(200).header('Content-Type','application/json; charset=utf-8').send(result);
            }
        }catch(err){
            reply.status(500).send(new Error(err))
        }
    }
}

const userController = new UserController(userService);

export {
    userController,
    UserController
};