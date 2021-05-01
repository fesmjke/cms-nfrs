export const PostCategoryResponce = {
	201 : {
		type: 'object',
        properties: {
			_id: { type: 'string' },
			title : { type : 'string' },
			description : {type : 'string'},
			image_path: {type : 'string'}
        }
	}
}

export const GetCategoriesResponce = {
	200 : {
		type : 'array',
		items : {
			type : 'object',
			properties : {
				_id: { type: 'string' },
                title : { type : 'string' },
                description : {type : 'string'},
                image_path: {type : 'string'}
			}
		}
	}
}

export const GetCategoryResponce = {
	200 : {
		type: 'object',
        properties: {
            _id: { type: 'string' },
            title : { type : 'string' },
            description : {type : 'string'},
            image_path: {type : 'string'}
        }
	}
}

export const DeleteCategoryResponce = {
	200 : {
		type: 'object',
        properties: {
            _id: { type: 'string' },
            title : { type : 'string' },
            description : {type : 'string'},
            image_path: {type : 'string'}
        }
	}
}

export const UpdateCategoryResponce = {
	200 : {
		type: 'object',
        properties: {
            _id: { type: 'string' },
            title : { type : 'string' },
            description : {type : 'string'},
            image_path: {type : 'string'}
        }
	}
}