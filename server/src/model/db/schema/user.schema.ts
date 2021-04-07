import { model, Schema } from "mongoose";
import { IUserDoc } from "../docs/user.doc";

const UserSchema : Schema = new Schema({
    user_name : { type : String,required : true,unique: true },
    name : {type : String,required : true},
    last_name : {type : String,required : true},
    birth_date : {
        day : {type : String,required : false},
        month : {type : String,required : false},
        year : {type : String,required : false}
    },
    phone_number : { type : String,required : false,unique: true },
    password : { type : String,required : true},
    email : { type : String,required : true,unique: true },
    roles : { type : Array,required : true}
},{
    timestamps : true,
});

export const User = model<IUserDoc>("User",UserSchema);