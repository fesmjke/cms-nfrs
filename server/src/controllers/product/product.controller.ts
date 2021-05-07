import { FastifyReply, FastifyRequest } from "fastify";
import { productService } from "../../services/product/product.service";
import { IProductController } from "../../types/interfaces/controller";
import { IProductService } from "../../types/interfaces/service";
import { DeleteProductIdRequest, GetProductIdRequest, GetProductsByCategory, PostProductAddCodes, PostProductAddReviewRequest, PostProductRequest, UpdateProductRequest } from "../../types/requests/product";
import { ErrorController } from "../error/error.controller";

class ProductController implements IProductController {
    private _productService : IProductService;
    private _errorController;

    constructor(productService : IProductService){
        this._productService = productService;
        this._errorController = new ErrorController();
    }

    create = async (request : PostProductRequest,reply : FastifyReply) => {
        try{
            request.body.image_url = request.file.filename;
            const createdProduct = await this._productService.create(request.body);
            reply.code(201).header('Content-Type','application/json; charset=utf-8').send(createdProduct);
        }catch(err){
            this._errorController.errorClassifier(err,reply);
        }
    }
    
    addReview = async (request : PostProductAddReviewRequest,reply : FastifyReply) => {
        const {id} = request.params;
        const result = await this._productService.addReview(id,request.body);
        return result
    }

    addActivationCodes = async (request : PostProductAddCodes,reply : FastifyReply) => {
        const {id} = request.params;
        const result = await this._productService.addActivationCodes(id,request.body.codes);
        return result
    }

    getProductsByCategory = async (request : GetProductsByCategory,reply : FastifyReply) => {
        const {id} = request.params;
        const result = await this._productService.getByCategoryId(id);
        return result;
    }

    getAll = async (request : FastifyRequest,reply : FastifyReply)  => {
        try{
            const products = await this._productService.getAll();
            reply.code(200).header('Content-Type','application/json; charset=utf-8').send(products);
        }catch(err){
            reply.status(500).send(new Error(err))
        }
    }
    
    getById = async (request : GetProductIdRequest,reply : FastifyReply)  => {
        try {
            const {id} = request.params;
            const product = await this._productService.getById(id);
            if(product === null){
                reply.code(404).header('Content-Type','application/json; charset=utf-8').send({});
            }else{
                reply.code(200).header('Content-Type','application/json; charset=utf-8').send(product);
            }
        } catch (err) {
            reply.status(500).send(new Error(err))
        }
    }

    updateById = async (request : UpdateProductRequest,reply : FastifyReply)  => {
        try{
            const {id} = request.params;
            
            const fileName = request.file ? request.file.filename : undefined;
            
            const updatedProduct = {
                title : request.body.title,
                price : request.body.price,
                discount : request.body.discount,
                description : request.body.description,
                category : request.body.category,
                image_url : fileName,
                developer : request.body.developer
            };

            const result = await this._productService.updateById(id,updatedProduct);
            
            if(result === null){
                reply.code(404).header('Content-Type','application/json; charset=utf-8').send({})
            }else{
                reply.code(200).header('Content-Type','application/json; charset=utf-8').send(result);
            }
        }catch(err){
            reply.status(500).send(new Error(err))
        }    
    }
    
    deleteById = async (request : DeleteProductIdRequest,reply : FastifyReply) => {
        try {
            const {id} = request.params;
            const result = await this._productService.deleteById(id);

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

const productController = new ProductController(productService);

export {
    productController,
    ProductController
};