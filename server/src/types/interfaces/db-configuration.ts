import { IConfig } from "./config";

export interface IDataBaseConfiguration extends IConfig {
    host : string;
    user : string;
    password : string;
    database : string;
}
