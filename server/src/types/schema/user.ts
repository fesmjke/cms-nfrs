import Joi, * as joi from "joi";
import { IUser } from "../interfaces/user";

export const PostUserResponce = {
	201 : {
		type: 'object',
        properties: {
          id: { type: 'string' },
          user_name : { type : 'string' },
		  name : {type : 'string'},
		  last_name: {type : 'string'},
		  birth_date : {
			  day : {type : 'string'},
			  month : {type : 'string'},
			  year : {type : 'string'}
		  },
		  phone_number : {type : 'string'},
		  email : { type : 'string'}
        }
	},
	'2xx' : {
		type: 'object',
        properties: {
          id: { type: 'string' },
          user_name : { type : 'string' },
		  name : {type : 'string'},
		  last_name: {type : 'string'}
        }
	}
	// later ??? ??  >_<
	// '4xx': {

	// },
	// '5xx' : {

	// }
}

export const PostUserSchema = joi.object<IUser>({
    user_name : joi.string().min(3).max(30).required(),
    name : joi.string().min(3).max(30).required(),
    last_name : joi.string().min(3).max(30).required(),
    birth_date : Joi.object({
        day : joi.number().integer().min(1).max(31),
        month : joi.number().integer().min(1).max(12),
        year : joi.number().integer().min(1900)
    }).optional(),
    phone_number : joi.string().pattern(new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')).optional(),
	email : joi.string().email().required(),
	password : joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})