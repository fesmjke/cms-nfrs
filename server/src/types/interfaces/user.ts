import { Entity } from "./entity";

export interface IUser extends Entity {
    user_name : string;
    name : string;
    last_name : string;
    phone_number : string;
    password : string;
    email : string;
    roles : string[];
}