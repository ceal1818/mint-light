//Importamos el framework express para manejar desde node.js de una forma más amigable las peticiones y respuestas http.
var app = require('./init-app');

//Ejecución de servidor.
app('dev').listen(4000, function(){
	console.log("Listening...");
});