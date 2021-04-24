import { ObjectId } from "mongoose";
import { IUser } from "../../types/interfaces/user";
import { IUserDoc } from "../db/docs/user.doc";
import { User } from "../db/schema/user.schema";

// rewrite and add new class for user
class UserModel {
    create = async (user : IUser) : Promise<IUser> => {
        return await User.create(user);
    }
    
    getAll = async () : Promise<IUser[]> => {
        return await User.find();
    }

    getById = async (id : string | number | ObjectId) : Promise<IUser | null> => {
        return await User.findById({_id : id});
    }

    getByEmail = async (email : string) : Promise<IUserDoc | null> => {
        return await User.findOne({email : email});
    }

    updateById = async (id : string | number,updatedUser : object) : Promise<IUser | null> => {
        return await User.findByIdAndUpdate(id,updatedUser,{new : true,omitUndefined : true});
    }

    deleteById = async (id : string | number | ObjectId) : Promise<IUser | null> => {
        return await User.findByIdAndDelete({_id : id});
    }
}

const userModel = new UserModel();

export {
    userModel,
    UserModel
};