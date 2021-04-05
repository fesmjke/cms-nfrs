import {userModel,UserModel} from "../../model/user/user.model";
import { IUser } from "../../types/interfaces/user";
import { IService } from "../../types/interfaces/service";

class UserService implements IService{
    private _userModel : UserModel;

    constructor(userModel : UserModel) {
        this._userModel = userModel;
    }

    create(user : IUser) : IUser {
        return this._userModel.create(user);
    }
    getAll() : IUser[] {
        return this._userModel.getAll();
    }
    getById(id : string | number) : IUser | object{
        return this._userModel.getById(id);
    }
    updateById(id : string | number,updatedUser : IUser) : IUser | object {
        return this._userModel.updateById(id,updatedUser);
    }
    deleteById(id : string | number) : object {
        return this._userModel.deleteById(id);
    }
}

const userService = new UserService(userModel)

export {
    userService,
    UserService
}