import { ObjectId } from "mongoose";
import { IAuth } from "../../types/interfaces/auth";
import { Auth } from "../db/schema/auth.schema";

class AuthModel {
    create = async (userId : string | ObjectId) : Promise<IAuth> => {
        return await Auth.create({user_id : userId});
    }
    
    getAuthById = async (authId : string | ObjectId) : Promise<IAuth | null> => {
        return await Auth.findById(authId);
    }

    getById = async (userId : string | ObjectId) : Promise<IAuth | null> => {
        return await Auth.findOne({user_id : userId});
    } 

    getAll = async () : Promise<IAuth[]> => {
        return await Auth.find();
    }

    logIn = async (userId : string | ObjectId) : Promise<IAuth | null> => {
        await Auth.findByIdAndUpdate(userId,{status : "loggined"})
        return await Auth.findOne({user_id : userId});
    }

    logOut = async (authId : string | ObjectId) : Promise<IAuth | null> => {
        return await Auth.findByIdAndDelete({_id : authId});
    }
}

const authModel = new AuthModel();

export {
    authModel,
    AuthModel
};