import { IServerConfiguration } from "../interfaces/server-configuration";
import { IDataBaseConfiguration } from "../interfaces/db-configuration";
import joi from "joi";

export const ServerConfigSchema = joi.object<IServerConfiguration>({
    port : joi.number().integer().required()
})

export const DataBaseConfigSchema = joi.object<IDataBaseConfiguration>({
    host : joi.string().min(1).required(),
    user : joi.string().min(1).required(),
    password : joi.string().min(1).required(),
    database : joi.string().min(1).required()
})