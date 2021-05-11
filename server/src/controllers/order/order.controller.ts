import { FastifyRequest,FastifyReply } from "fastify";
import MailService from "../../services/mail/mail.service";
import { orderService } from "../../services/order/order.service";
import {productModel} from "../../model/product/product.model";
import { ProductService } from "../../services/product/product.service";
import { IController } from "../../types/interfaces/controller";
import { IService } from "../../types/interfaces/service";
import { DeleteOrderIdRequest, GetOrderIdRequest, PostOrderRequest, UpdateOrderRequest } from "../../types/requests/order";
import { ErrorController } from "../error/error.controller";


class OrderController implements IController {
    private _orderService : IService;
    private _mailService : MailService;
    private _productService : ProductService;
    private _errorController;

    constructor(orderService : IService) { 
        this._orderService = orderService;
        this._mailService = new MailService();
        this._productService = new ProductService(productModel);
        this._errorController = new ErrorController();
    }

    public create = async (request : PostOrderRequest,reply : FastifyReply) => {
        try{
            const createdOrder = await this._orderService.create(request.body);
            const activationsKeys = await this._productService.getActivationsCodes(request.body.products);
            this._mailService.sendEmail("",activationsKeys);
            reply.code(201).header('Content-Type','application/json; charset=utf-8').send(createdOrder);
        }catch(err){
            this._errorController.errorClassifier(err,reply);
        }
    }

    public getAll = async (request : FastifyRequest,reply : FastifyReply) => {
        try{
            const orders = await this._orderService.getAll();
            reply.code(200).header('Content-Type','application/json; charset=utf-8').send(orders);
        }catch(err){
            reply.status(500).send(new Error(err))
        }
    }

    public getById = async (request : GetOrderIdRequest,reply : FastifyReply) => {
        try{
            const {id} = request.params;
            const order = await this._orderService.getById(id);

            if(order === null){
                reply.code(404).header('Content-Type','application/json; charset=utf-8').send({});
            }else{
                reply.code(200).header('Content-Type','application/json; charset=utf-8').send(order);
            }
        }catch(err) {
            reply.status(500).send(new Error(err))
        }
    }

    public deleteById = async (request : DeleteOrderIdRequest,reply : FastifyReply) => {
        try {
            const {id} = request.params;
            const result = await this._orderService.deleteById(id);

            if(result === null){
                reply.code(404).header('Content-Type','application/json; charset=utf-8').send({})
            }else{
                reply.code(200).header('Content-Type','application/json; charset=utf-8').send(result);
            }
        }catch(err){
            reply.status(500).send(new Error(err))
        }
    }

    public updateById = async (request : UpdateOrderRequest,reply : FastifyReply) => {
        try{
            const {id} = request.params;
            const updatedOrder = {};

            const result = await this._orderService.updateById(id,updatedOrder);
            
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

const orderController = new OrderController(orderService);

export {
    orderController,
    OrderController
};