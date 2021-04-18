import Joi from "joi";
import { IUser } from "../interfaces/user";

export const PostUserResponce = {
	201 : {
		type: 'object',
        properties: {
			_id: { type: 'string' },
			user_name : { type : 'string' },
			name : {type : 'string'},
			last_name: {type : 'string'},
			phone_number : {type : 'string'},
			email : { type : 'string'}
        }
	},
	'2xx' : {
		type: 'object',
        properties: {
			_id: { type: 'string' },
			user_name : { type : 'string' },
			name : {type : 'string'},
			last_name: {type : 'string'},
			phone_number : {type : 'string'},
			email : {type : 'string'}
        }
	}
	// later ??? ??  >_<
	// '4xx': {

	// },
	// '5xx' : {

	// }
}

export const GetUsersResponce = {
	200 : {
		type : 'array',
		items : {
			type : 'object',
			properties : {
				_id: { type: 'string' },
				user_name : { type : 'string' },
				name : {type : 'string'},
				last_name: {type : 'string'},
				phone_number : {type : 'string'},
				email : {type : 'string'}
			}
		}
	}
}

export const GetUserResponce = {
	200 : {
		type: 'object',
        properties: {
          _id: { type: 'string' },
          user_name : { type : 'string' },
		  name : {type : 'string'},
		  last_name: {type : 'string'},
		  phone_number : {type : 'string'},
		  email : {type : 'string'}
        }
	}
}

export const DeleteUserResponce = {
	200 : {
		type: 'object',
        properties: {
          _id: { type: 'string' },
          user_name : { type : 'string' },
		  name : {type : 'string'},
		  last_name: {type : 'string'},
		  phone_number : {type : 'string'},
		  email : {type : 'string'}
        }
	}
}

export const UpdateUserResponce = {
	200 : {
		type: 'object',
        properties: {
          _id: { type: 'string' },
          user_name : { type : 'string' },
		  name : {type : 'string'},
		  last_name: {type : 'string'},
		  phone_number : {type : 'string'},
        }
	}
}

export const PostUserSchema = Joi.object<IUser>({
    user_name : Joi.string().min(3).max(30).required(),
    name : Joi.string().min(3).max(30).required(),
    last_name : Joi.string().min(3).max(30).required(),
    phone_number : Joi.string().pattern(new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')).required(),
	email : Joi.string().email().required(),
	password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})