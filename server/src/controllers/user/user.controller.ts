import { IController } from "../../types/interfaces/controller";
import { Request,Response } from "express";
import { IService } from "../../types/interfaces/service";
import {userService} from "../../services/user/user.service";

class UserController implements IController {
    private _userService : IService;

    constructor(userService : IService) { 
        this._userService = userService;
    }

    public create = async (req : Request,res : Response) => {
        // gen id
        // after include gen id in object.

        console.log(req.body.id, req.params.id);

        const user = { id : req.body.id,
                      name : req.body.name,
                      lastName : req.body.lastName,
                      password : req.body.password,
                      email : req.body.email}
        res.send(this._userService.create(user))
    }

    public getAll = async (req : Request,res : Response) => {
        const users = this._userService.getAll();
        console.log(req.params);
        res.send(users);
    }

    public getById = async (req : Request,res : Response) => {
        console.log(req.params.id);
        res.send("YEP");
    }

    public deleteById = async (req : Request,res : Response) => {
        console.log(req.params.id);
        res.send("YEP");
    }

    public updateById = async (req : Request,res : Response) => {
        console.log(req.params.id);
        res.send("YEP");
    }
}

const userController = new UserController(userService);

export {
    userController,
    UserController
};