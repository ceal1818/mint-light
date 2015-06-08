module.exports = {
	errors: {
		not_found:{
			code: 404,
			message: 'Not found resource.'
		},
		internal: {
			code: 500
		}
	},
	users: {
		get: {
			code: 200
		},
		post: {
			code: 201
		},
		put: {
			code: 200,
			message: 'Resource updated!'
		},
		delete: {
			code: 200,
			message: 'Resource deleted!'
		},		
	}	
};