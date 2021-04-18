import mongoose from "mongoose";
import DataBaseConfigLoader from "../../config/db-config.loader";
import { IDataBaseConfiguration } from "../../types/interfaces/db-configuration";

export default class DataBase {
    private static _database_instance : DataBase;

    private _connection_url : string;
    private _connection : mongoose.Connection;
    private _connection_config : IDataBaseConfiguration;
    private _db_config_loader : DataBaseConfigLoader;

    constructor(){
        this._db_config_loader = new DataBaseConfigLoader('.config-database.json');
        this._connection_config = this._db_config_loader.loadSync();
        this._connection_url = this._connection_config.host + '/' + this._connection_config.database;
        this._connection = mongoose.createConnection(this._connection_url,
                                                    {useCreateIndex : true,useNewUrlParser : true,useUnifiedTopology : true,
                                                        useFindAndModify : false})
    }

    
    public get connection() : mongoose.Connection {
        return this._connection
    }
    

    public static get database_instance() : DataBase {
        return this._database_instance || (this._database_instance = new this());
    }

    public connect(){
        mongoose.connect(this._connection_url,{useCreateIndex : true,useNewUrlParser : true,useUnifiedTopology : true,useFindAndModify : false},(err) => {
            if(err){
                console.log("MONGO ERROR ",err.message)
            }else{
                console.log('Connected to MongoDb');
            }
        })
    }
}