import { IUser } from "../../types/interfaces/user";
import { User } from "../db/schema/user.schema";

// rewrite and add new class for user
class UserModel {
    create = async (user : IUser) : Promise<IUser> => {
        return await User.create(user);
    }
    // getAll() : IUser[] {
    //     return this._users;
    // }
    // getById(id : string | number) : IUser | object {
    //     this._users.forEach(user => {
    //         if(user.id === id){
    //             return user;
    //         }else{
    //             return {"id" : id,"status" : "not found"}
    //         }
    //     });
    //     return {"id" : id,"status" : "not found"};
    // }
    // updateById(id : string | number,updatedUser : IUser) : IUser | object {
    //     let counter = 0;
    //     this._users.forEach(user => {
    //         counter +=1;
    //         if(user.id === id){
    //             this._users[counter] = updatedUser;
    //             return updatedUser;
    //         }else{
    //             return {"id" : id,"status" : "not updated"}
    //         }
    //     })
    //     return {"id" : id,"status" : "not updated"};
    // }
    // deleteById(id : string | number) : object {
    //     return {"id" : id,"status" : "not worked"};
    // }
}

const userModel = new UserModel();

export {
    userModel,
    UserModel
};