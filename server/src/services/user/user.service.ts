import {userModel,UserModel} from "../../model/user/user.model";
import { IUser } from "../../types/interfaces/user";
import { IService } from "../../types/interfaces/service";
import { ObjectId } from "mongoose";

class UserService implements IService{
    private _userModel : UserModel;

    constructor(userModel : UserModel) {
        this._userModel = userModel;
    }

    create = async (user : IUser) : Promise<IUser> => {
        return await this._userModel.create(user);
    }
    
    getAll = async () : Promise<IUser[]> => {
        return await this._userModel.getAll();
    }
    
    getById = async (id : string | number | ObjectId) : Promise<IUser | null> => {
        return await this._userModel.getById(id);
    }
    
    updateById = async (id : string | number,updatedUser : IUser) : Promise<IUser | null> => {
        return await this._userModel.updateById(id,updatedUser);
    }

    deleteById = async (id : string | number | ObjectId) : Promise<IUser | null> => {
        return await this._userModel.deleteById(id);
    }
}

const userService = new UserService(userModel)

export {
    userService,
    UserService
}