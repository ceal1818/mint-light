//Importa y devuelve las constantes 'errors' del enum de respuestas rest definidas. 
var rest_error_responses = require('../enums/rest-responses').errors;

/*
* Expone una función middleware de manejo de errores.
* err objeto con definición de error.
* request objeto wrapper de HTTP Request.
* response objeto wrapper de HTTP Response.
* next función de paso a próximo middleware express.
*/
module.exports = function(err, request, response, next){
	//Obtenemos las constantes del error definido en el objeto err. 
	var error = rest_error_responses[err.name];

	/*
	* Si el error no esta definido dentro de las constantes, se devuelve el control
	* al siguiente middleware sin responder.
	*/
	if (!error){
		next();
	}

	/*
	* Existe el error y response con el HTTP status code de la constante obtenido desde el enum.
	* El mensaje devuelto en la respuesta sigue el siguiente sistema de prelación: si el mensaje 
	* esta en la constante obtenida del error se envía sino el obtejo err debe tener el mensaje. 
	*/
	response.status(
		error.code
		).send(
		error.message || err.message
		);
};