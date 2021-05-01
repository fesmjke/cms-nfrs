import { ObjectId } from "mongoose";
import { Entity } from "./entity";
import { IProduct, IReview } from "./product";

export interface IService{
    create(entity : Entity) : Promise<Entity>;
    getAll() : Promise<Entity[]>;
    getById(id : string | number | ObjectId) : Promise<Entity | null>;
    updateById(id : string | number | ObjectId, updatedEntity : object) : Promise<Entity | null>;
    deleteById(id : string | number | ObjectId) : Promise<object | null>;
} 

export interface IProductService extends IService {
    addReview(id : string | number | ObjectId,review : IReview) : Promise<IProduct | null>;
    addActivationCodes(id : string | number | ObjectId,codes : string[]) : Promise<IProduct | null>
}