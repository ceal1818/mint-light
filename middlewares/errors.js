var rest_error_responses = require('../enums/rest-responses').errors;

module.exports = function(err, request, response, next){
	var error = rest_error_responses[err.name]
		code = error.code,
		message = error.message || err.message;

	if (!error){
		response.next();
	}

	response.status(code).send(message);
};