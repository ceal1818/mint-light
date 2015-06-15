//Definición de enum de respuestas REST.
module.exports = {
	//Este atributo controla los errores comunes de la aplicación.
	errors: {
		//Error de recurso no encontrado.
		not_found:{
			code: 404,
			message: 'Not found resource.'
		},
		//Error interno del servidor o de la aplicación.
		internal: {
			code: 500
		}
	},
	//Este atributo controla las respuestas exitosas de cada uno de los métodos HTTP.
	users: {
		//GET: devuele el HTTP status 200 como éxito al devolver valores.
		get: {
			code: 200
		},
		//POST: devuelve el HTTP status 201 como éxito al crear recurso.
		post: {
			code: 201
		},
		//PUT: devuelve el HTTP status 200 como éxito al actualizar un recurso.
		put: {
			code: 200,
			message: 'Resource updated!'
		},
		//DELETE: devuelve el HTTP status 200 como éxito al eliminar un recurso.
		delete: {
			code: 200,
			message: 'Resource deleted!'
		},		
	}	
};