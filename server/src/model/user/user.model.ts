import { UserEntity } from "../../types/interfaces/entity";

class UserModel {
    // connection;
    private _users : UserEntity[];

    constructor(){
        this._users = [];
    }

    create(user : UserEntity) : UserEntity {
        console.log(user);
        this._users.push(user);
        return user;
    }
    getAll() : UserEntity[] {
        return this._users;
    }
    getById(id : string | number) : UserEntity | object {
        this._users.forEach(user => {
            if(user.id === id){
                return user;
            }else{
                return {"id" : id,"status" : "not found"}
            }
        });
        return {"id" : id,"status" : "not found"};
    }
    updateById(id : string | number,updatedUser : UserEntity) : UserEntity | object {
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