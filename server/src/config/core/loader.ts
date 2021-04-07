import { IConfig } from "../../types/interfaces/config";
import { ILoader } from "../../types/interfaces/loader";

export abstract class Loader implements ILoader{
    protected name : string;
    constructor(name : string){
        this.name = name;
    }

    abstract loadAsync() : Promise<IConfig>;
    
    abstract loadSync() : IConfig;
}