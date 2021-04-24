export const AuthLogInResponce = {
	200 : {
		type: 'object',
        properties: {
            _id : {type : "string"},
            token : {type : "string"}
        }
	},
    400 : {
        type: 'object',
        properties : {
            message : {type : "string"}
        }
    }
}