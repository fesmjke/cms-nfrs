import Joi from "joi"
import { ILogIn, ILogOut } from "../interfaces/auth"

export const AuthLogInResponce = {
	200 : {
		type: 'object',
        properties: {
            _id : {type : "string"},
            token : {type : "string"}
        }
	},
    401 : {
        type: 'object',
        properties : {
            error : {type : "string"},
            code : {type : "string"},
            message : {type : "string"}
        }
    }
}

export const AuthLogOutResponce = {
    200 : {
		type: 'object',
        properties: {
            error : {type : 'string'},
            result : {type : 'object',
            properties : {
                _id : {type : "string"}
            }},
            message : {type : "string"}
        }
	},
    401 : {
        type : 'object',
        properties : {
            error : {type : "string"},
            code : {type : "string"},
            message : {type : "string"}
        }
    }
}

export const PostLogInSchema = Joi.object<ILogIn>({
    email : Joi.string().min(3).max(30).required(),
    password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

export const PostLogOutSchema = Joi.object<ILogOut>({
    authId : Joi.string().required()    
})