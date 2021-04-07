import { IConfig } from "./config";

export interface ILoader {
    loadAsync() : Promise<IConfig>;
    loadSync() : IConfig;
}