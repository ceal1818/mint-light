//Importación de express.
var express = require('express');
//Importación e instanciación del controller de users.
var controller = require('./controllers/users');
//Instanciación de middleware de routes.
var router = express.Router();
var fs = require('fs');
var _ = require('underscore');
var Q = require('q');
var path = require('path');

var module_deferred = Q.defer(),
	mint_module = {};

fs.readdir(__dirname, function(err, files){
	var dirs = [];
	if (err) module_deferred.reject(err);
	files.forEach(function(file) {
		if (file == 'controllers' || file == 'services'){
			dirs.push(file);
		}
	});
	module_deferred.resolve(dirs);
});

module_deferred.promise.then(
	function(dirs){
		dirs.forEach(function(dir){
			var dirs_deferred = Q.defer();
			var obj_components = {},
				obj_attr = {};

			fs.readdir(path.join(__dirname, dir), function(err, files){
				if (err) dirs_deferred.reject(err);

				files.forEach(function(file){
					var obj_file = file.substring(0, file.indexOf('.'));
					obj_components[obj_file] = require("./"+dir+"/"+obj_file);
				});
				obj_attr[dir] = obj_components;

				dirs_deferred.resolve(obj_attr);
			});

			dirs_deferred.promise.then(
				function(attr){
					mint_module = _.extend(mint_module, attr);
					console.log(mint_module);
				},
				function(err){
					console.log(err);
				}
			);
		});
	}, function(err){
		console.log(err);
	}
);



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

