//Importamos el framework express para manejar desde node.js de una forma más amigable las peticiones y respuestas http.
var express = require('express'),
	//Importamos la librería body-parser para manejar el cuerpo de la petición HTTP.
	bodyParser = require('body-parser'),
	morgan = require('morgan');
	//Routes definidos y controlados para una entidad especifica.
	users = require('./routes/users'),
	//Implementación de middleware de control de errores.
	m_error = require('./middlewares/errors');

module.exports = function(conf){
	//Instanciación del contexto de la aplicación que representa en si mismo el servidor.
	var app = express();
	/*
	* La declaración de los middleware en express es sumamente importante porque así 
	* se indica como seguirá el flujo de ejecución en modo pila.
	*/
	//Uso del middleware encargado de parsear el body de los request a formato JSON.
	app.use(bodyParser.json());
	//Uso del middleware que controlará los logs.
	if (conf.morgan){
		app.use(morgan('combined'));
	}
	/*
	* Uso de los routes de users como un middleware asociado a una ruta principal, 
	* en este caso '/users'.
	*/
	app.use('/users', users);
	//Uso de middleware de errores.
	app.use(m_error);

	return app;
};