//Importación de express.
var express = require('express');
//Importación e instanciación del controller de users.
var controller = require('./controllers/users');
//Instanciación de middleware de routes.
var router = express.Router();

/*
* Se define en una ruta principal los listeners de los métodos get y post. Los métodos que 
* escuchan a estos métodos son list y create de la instancia del controller, respectivamente.
* Cada uno de estos métodos tienen los parametros request, response y next.
*
* Desde este punto se esta siguiendo el estandar REST para los métodos get y post. 
*/
router.route('/')
	.get(controller.list)
	.post(controller.create);

/*
* Se define en una ruta para un recurso especificado por ID los listeners de los 
* métodos get, put y delete. Los métodos que escuchan a estos métodos son getById, 
* update y delete de la instancia del controller, respectivamente. 
* Cada uno de estos métodos tienen los parametros request, response y next.
*
* Desde este punto se esta siguiendo el estandar REST para los métodos get, put y delete. 
*/
router.route('/:id')
	.get(controller.getById)
	.put(controller.update)
	.delete(controller.delete);

//Usamos el método de declaración y exportación de módulos node.js para router.
module.exports = router;

