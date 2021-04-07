import { Loader } from "./core/loader";
import { IDataBaseConfiguration } from "../types/interfaces/db-configuration";
import { DataBaseConfigSchema } from "../types/schema/configs";
import * as fs from "fs";
import * as path from "path";

export default class DataBaseConfigLoader extends Loader{
    private _data_base_config_path : string;
    constructor(name : string) {
        super(name);
        this._data_base_config_path = path.resolve(process.cwd(), this.name)
    }
    
    loadAsync = async () : Promise<IDataBaseConfiguration> => {
        return new Promise<IDataBaseConfiguration>((resolve,reject)=> {
            fs.readFile(this._data_base_config_path,(err : NodeJS.ErrnoException | null, dataBuff ) => {
                if (err){
                    reject(err)
                }else{
                    const data = JSON.parse(dataBuff.toString());
                    
                    const validationResult = DataBaseConfigSchema.validate(data);
                    
                    if(validationResult.error){
                        reject(validationResult.error.message)
                    }
                    
                    resolve(data)
                }
            })
        })
    }
    
    loadSync = () : IDataBaseConfiguration => {
        try{
            const dataBuff = fs.readFileSync(this._data_base_config_path)
            
            const data = JSON.parse(dataBuff.toString());
            
            const validationResult = DataBaseConfigSchema.validate(data);
                    
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