import { Entity } from "./entity";

export interface ICategory extends Entity {
    title : string;
    description : string;
    image_path : string;
}