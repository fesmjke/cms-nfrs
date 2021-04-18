import { model, Schema } from "mongoose";
import { IUserDoc } from "../docs/user.doc";
import bcrypt from "bcrypt";


const UserSchema : Schema = new Schema({
    user_name : { type : String,required : true,unique: [true,'That username is taken.'] },
    name : {type : String,required : true},
    last_name : {type : String,required : true},
    phone_number : { type : String,required : true,unique: [true,'That phone number is taken.'] },
    password : { type : String,required : true},
    email : { type : String,required : true,unique: [true,'That email address is taken.'] },
    roles : { type : Array,required : true}
},{
    timestamps : true,
}).pre("save", function(this : IUserDoc,next){
    const user = this;
    user.roles.push('user')
    
    const rounds = 10;

    bcrypt.genSalt(rounds,function(err,salt) {
        if(err) return next(err);
        let password = user.password;

        bcrypt.hash(password,salt,function(err,hash){
            if(err) return next(err);
            user.password = hash;
            next();
        })
    })
});

export const User = model<IUserDoc>("User",UserSchema);