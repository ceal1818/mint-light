//Importamos el framework express para manejar desde node.js de una forma más amigable las peticiones y respuestas http.
var express = require('express');
//Importamos la librería body-parser para manejar el cuerpo de la petición HTTP.
var bodyParser = require('body-parser');
//Importamos mongoose como una librería wrapper más amigable de la librería de mongodb.
var mongoose = require('mongoose');

//Configuración de base de datos en formato JS enum.
var db_conf = require('./conf/db-conf');
//Implementación de middleware para llevar el log de las respuestas HTTP.
var logger = require('./utils/logger');
//Routes definidos y controlados para una entidad especifica.
var users = require('./routes/users');
//Implementación de middleware de control de errores.
var m_error = require('./middlewares/errors');

//Conexión a base de datos mongodb con datos de conexión proporcionados por un enum.
mongoose.connect(db_conf.uri, function(err, response){
	if (err){
		throw err;
	}
	console.log('Connecting');
});

//Instanciación del contexto de la aplicación que representa en si mismo el servidor.
var app = express();

/*
* La declaración de los middleware en express es sumamente importante porque así 
* se indica como seguirá el flujo de ejecución en modo pila.
*/
//Uso del middleware encargado de parsear el body de los request a formato JSON.
app.use(bodyParser.json());
//Uso del middleware que controlará los logs.
app.use(logger);
/*
* Uso de los routes de users como un middleware asociado a una ruta principal, 
* en este caso '/users'.
*/
app.use('/users', users);

//Uso de middleware de errores.
app.use(m_error);

//Ejecución de servidor.
app.listen(4000, function(){
	console.log("wow!!");
});