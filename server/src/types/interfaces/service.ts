import { Entity } from "./entity";

export interface IService{
    create(entity : Entity) : Entity;
    getAll() : Entity[];
    getById(id : string | number) : Entity | object;
    updateById(id : string | number, updatedEntity : Entity) : Entity | object;
    deleteById(id : string | number) : object;
} 