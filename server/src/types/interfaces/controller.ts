import { Request,Response } from "express";

export interface IController {
    create(req : Request,res : Response);
    getAll(req : Request,res : Response);
    getById(req : Request,res : Response);
    updateById(req : Request,res : Response);
    deleteById(req : Request,res : Response);
}