import { IUser } from "../../types/interfaces/user";

class UserModel {
    // connection;
    private _users : IUser[];

    constructor(){
        this._users = [];
    }

    create(user : IUser) : IUser {
        this._users.push(user);
        user.id = "1";
        return user;
    }
    getAll() : IUser[] {
        return this._users;
    }
    getById(id : string | number) : IUser | object {
        this._users.forEach(user => {
            if(user.id === id){
                return user;
            }else{
                return {"id" : id,"status" : "not found"}
            }
        });
        return {"id" : id,"status" : "not found"};
    }
    updateById(id : string | number,updatedUser : IUser) : IUser | object {
        let counter = 0;
        this._users.forEach(user => {
            counter +=1;
            if(user.id === id){
                this._users[counter] = updatedUser;
                return updatedUser;
            }else{
                return {"id" : id,"status" : "not updated"}
            }
        })
        return {"id" : id,"status" : "not updated"};
    }
    deleteById(id : string | number) : object {
        return {"id" : id,"status" : "not worked"};
    }
}

const userModel = new UserModel();

export {
    userModel,
    UserModel
};