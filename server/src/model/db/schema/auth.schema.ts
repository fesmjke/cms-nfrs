import { model,Schema } from "mongoose";
import { IAuthDoc } from "../docs/auth.doc";
import { User } from "./user.schema";

const AuthSchema : Schema = new Schema({
    user_id : {type: Schema.Types.ObjectId, ref: 'User'},
    status : {type : String},
    token : {type : String}
},{
    timestamps : false,
    versionKey : false
}).pre("save", function(this : IAuthDoc,next){
    User.findById(this.user_id).then((user) => {
        if(user){
            this.token = user.id + "." + user.roles.join('');
            next();
        }
    });
})

export const Auth = model<IAuthDoc>("Auth",AuthSchema);