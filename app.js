//Importamos el framework express para manejar desde node.js de una forma más amigable las peticiones y respuestas http.
var init_app = require('./init-app'),
	init_ds = require('./init-ds'),
		//Configuración de base de datos en formato JS enum.
	conf = require('./conf/enviroments'),
	arge = 'dev';

process.argv.forEach(function(val, index, array){
	arge = val;
});

init_ds(conf(arge));
//Ejecución de servidor.
init_app(conf(arge)).listen(4000, function(){
	console.log("Listening...");
});