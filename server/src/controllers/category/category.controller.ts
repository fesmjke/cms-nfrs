import { FastifyReply, FastifyRequest } from "fastify";
import { categoryService } from "../../services/category/category.service";
import { IController } from "../../types/interfaces/controller";
import { IService } from "../../types/interfaces/service";
import { DeleteCategoryIdRequest, GetCategoryIdRequest, PostCategoryRequest, UpdateCategoryRequest } from "../../types/requests/category";
import { ErrorController } from "../error/error.controller";

class CategoryController implements IController {
    private _categoryService : IService;
    private _errorController;

    constructor(categoryService : IService){
        this._categoryService = categoryService;
        this._errorController = new ErrorController();
    }

    create = async (request : PostCategoryRequest,reply : FastifyReply) : Promise<any> => {
        try{
            request.body.image_path = request.file.filename;

            const createdCategory = await this._categoryService.create(request.body)
            reply.code(201).header('Content-Type','application/json; charset=utf-8').send(createdCategory);
        }catch(err){
            this._errorController.errorClassifier(err,reply);
        }
    }
    getAll = async (request : FastifyRequest,reply : FastifyReply) : Promise<any> => {
        try{
            const categories = await this._categoryService.getAll();
            reply.code(200).header('Content-Type','application/json; charset=utf-8').send(categories);
        }catch(err){
            reply.status(500).send(new Error(err))
        }
    }
    
    getById = async (request : GetCategoryIdRequest,reply : FastifyReply) : Promise<any> => {
        try{
            const {id} = request.params;
            const category = await this._categoryService.getById(id);
            if(category === null){
                reply.code(404).header('Content-Type','application/json; charset=utf-8').send({});
            }else{
                reply.code(200).header('Content-Type','application/json; charset=utf-8').send(category);
            }
        }catch(err){
            reply.status(500).send(new Error(err))
        }
    }
    
    deleteById = async (request : DeleteCategoryIdRequest,reply : FastifyReply) : Promise<any> => {
        try {
            const {id} = request.params;
            const category = await this._categoryService.deleteById(id);

            if(category === null){
                reply.code(404).header('Content-Type','application/json; charset=utf-8').send({})
            }else{
                reply.code(200).header('Content-Type','application/json; charset=utf-8').send(category);
            }
        } catch (err) {
            reply.status(500).send(new Error(err))
        }
    }
    
    updateById = async (request : UpdateCategoryRequest,reply : FastifyReply) : Promise<any> => {
        try{
            const {id} = request.params;
            const fileName = request.file ? request.file.filename : undefined;

            const updatedCategory = { title: request.body.title,
                    description : request.body.description,
                    image_path : fileName };
            const updateResult = await this._categoryService.updateById(id,updatedCategory);

            if(updateResult === null){
                reply.code(404).header('Content-Type','application/json; charset=utf-8').send({})
            }else{
                reply.code(200).header('Content-Type','application/json; charset=utf-8').send(updateResult);
            }
        }catch(err){
            reply.status(500).send(new Error(err))
        }

    }
}

const categoryController = new CategoryController(categoryService);

export {
    categoryController,
    CategoryController
};