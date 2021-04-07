import { IServerConfiguration } from "../types/interfaces/server-configuration";
import { Loader } from "./core/loader";
import { ServerConfigSchema } from "../types/schema/configs";
import * as fs from "fs";
import * as path from "path";

export default class ServerConfigLoader extends Loader{
    private _server_config_path : string;
    constructor(name : string) {
        super(name);
        this._server_config_path = path.resolve(process.cwd(), this.name)
    }
    
    loadAsync = async () : Promise<IServerConfiguration> => {
        return new Promise<IServerConfiguration>((resolve,reject)=> {
            fs.readFile(this._server_config_path,(err : NodeJS.ErrnoException | null, dataBuff ) => {
                if (err){
                    reject(err)
                }else{
                    const data = JSON.parse(dataBuff.toString());
                    
                    const validationResult = ServerConfigSchema.validate(data);
                    
                    if(validationResult.error){
                        reject(validationResult.error)
                    }

                    resolve(data)
                }
            })
        })
    }
    
    loadSync = () : IServerConfiguration => {
        try{
            const dataBuff = fs.readFileSync(this._server_config_path)
            
            const data = JSON.parse(dataBuff.toString());
            
            const validationResult = ServerConfigSchema.validate(data);
                    
            if(validationResult.error){
                throw new Error(validationResult.error.message);
            }

            return data
        }catch(err){
            console.error(err.code,err.message) // later need add logger
            throw new Error(err); // -> logger should write this error to file or smth
        }
    }
}

