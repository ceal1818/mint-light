//Importamos el model mongoose user.
var User = require('../models/user'),
	//Importamos las constantes de respuesta users.
	users_responses = require('../enums/rest-responses').users;
	//Importamos la librería underscore que es una utilidad para el uso de objetos, colecciones en JS.
	_ = require('underscore');

//Exportamos el objeto controller.
module.exports = { 

	/*
	* create Método encargado de crear una instancia de una entidad user.
	*/
	create: function(request, response, next){
		//Se obtiene el body del request de user.
		var userJson = request.body;
		/*
		* Se llama al método count del model mongoose, que devuelve el contador 
		* de todos los documentos en la colección user. La ejecución asincrona
		* de este método hace uso de una función callback recibe como parametros: 
		* err y count.
		*/
		User.count({}, function(err, count){
			/*
			* Si internamente se produce un error, se llama al próximo middleware 
			* que controla los errores, pasandole un mensaje.
			*/
			if (err){
				next({name: 'internal', message: 'Error count resources.'});
			}
			/*
			* Usamos la utilidad extend de underscore para extender el JSON 
			* que guardaremos en la colección users. Guardamos el UID que 
			* estamos generando.
			*/
			_.extend(userJson, {uid: (count + 1)});
			//Instanciamos un model mongoose User con los datos del JSON.
			var user = new User(userJson);

			/*
			* Se llama al método save de la instancia del model user para guardar 
			* el documento en MongoDB. El callback que le pasamos como parametro 
			* controla el error que se produzca al guardalo en la colección, y si 
			* no se recibe algún error significa que hemos creado el documento 
			* correctamente.
			*/
			user.save(function(err){
				/*
				* Si internamente se produce un error, se llama al próximo middleware 
				* que controla los errores, pasandole un mensaje.
				*/
				if (err){
					next({name: 'internal', message: 'Error save resource.'});
				}
				//Devolvemos en el HTTP response el HTTP status adecuado y el documento creado.
				response.status(
					users_responses.post.code
					).json(userJson);
			});
		});
	},
	
	/*
	* list Método encargado de devolver todas las instancias de la entidad user.
	*/
	list: function(request, response, next){
		/*
		* Se llama al método find del model mongoose sin argumentos de búsqueda, 
		* que devuelve todos los documentos en la colección user. La ejecución asincrona
		* de este método hace uso de una función callback que recibe como parametros: 
		* err y users.
		*/
		User.find({}, function(err, users){
			/*
			* Si internamente se produce un error, se llama al próximo middleware 
			* que controla los errores, pasandole un mensaje.
			*/			
			if (err){
				next({name: 'internal', message: 'Error list resources.'});
			}
			//Devolvemos en el HTTP response el HTTP status adecuado y la colección de documentos existentes.
			response.status(
				users_responses.get.code
				).json(users);
		});
	},

	/*
	* getById Método encargado de devolver una entidad user por un ID especifico.
	*/
	getById: function(request, response, next){
		//Obtienes el ID del recurso variable que indicas en el querystring de la URL.
		var id = parseInt(request.params.id);
		/*
		* Se llama al método findOne del model mongoose con el argumento uid igual al 
		* ID obtenido, que devuelve solo una única ocurrencia en la colección user. 
		* La ejecución asincrona de este método hace uso de una función callback 
		* que recibe como parametros: err y user.
		*/		
		User.findOne({uid: id}, function(err, user){
			/*
			* Si internamente se produce un error, se llama al próximo middleware 
			* que controla los errores, pasandole un mensaje.
			*/	
			if (err){
				next({name: 'internal', message: 'Error find resource.'});
			}

			/*
			* Si el objeto user encontrado existe se devuelve en el response.
			* Sino se devuelve al middleware de error un error de recurso no encontrado. 
			*/
			if (user){
				response.status(
					users_responses.get.code
					).json(user);	
			}
			else {
				next({name: 'not_found'});
			}
		});
	},

	/*
	* update Método encargado de actualizar una entidad user por un ID especifico.
	*/
	update: function(request, response, next){
		/*
		* Obtiene el ID del recurso variable que indicas en el querystring de la URL. 
		* También se obtiene el JSON que representa ese recurso con los nuevos datos 
		* que se desean actualizar.
		*/
		var id = parseInt(request.params.id),
			userJson = request.body;

		/*
		* Se llama al método findOne del model mongoose con el argumento uid igual al 
		* ID obtenido, que devuelve solo una única ocurrencia en la colección user. 
		* La ejecución asincrona de este método hace uso de una función callback 
		* que recibe como parametros: err y user.
		*/	
		User.findOne({uid: id}, function(err, user){
			/*
			* Si internamente se produce un error, se llama al próximo middleware 
			* que controla los errores, pasandole un mensaje.
			*/	
			if (err){
				next({name: 'internal', message: 'Error find resource.'});
			}

			/*
			* Si el objeto user encontrado existe se procede a actualizarlo.
			* Sino se devuelve al middleware de error un error de recurso no encontrado. 
			*/
			if (user){
				/*
				* Se llama al método update del model mongoose con el argumento _id igual al 
				* _id obtenido y con el JSON que tiene la entidad totalmente modificada. 
				* La ejecución asincrona de este método hace uso de una función callback 
				* que recibe como parametros: err y raw.
				*/	
				User.update({_id: user._id}, userJson, {}, function(err, raw){
					/*
					* Si internamente se produce un error, se llama al próximo middleware 
					* que controla los errores, pasandole un mensaje.
					*/	
					if (err){
						next({name: 'internal', message: 'Error update resource.'});
					}

					//Devolvemos en el HTTP response el HTTP status adecuado y el documento actualizado.
					response.status(
						users_responses.put.code
						).send(users_responses.put.message);
				});
			}
			else {
				next({name: 'not_found'});
			}
		});
	},

	/*
	* delete Método encargado de eliminar una entidad user por un ID especifico.
	*/
	delete: function(request, response, next){
		//Obtienes el ID del recurso variable que indicas en el querystring de la URL.
		var id = parseInt(request.params.id);

		/*
		* Se llama al método findOne del model mongoose con el argumento uid igual al 
		* ID obtenido, que devuelve solo una única ocurrencia en la colección user. 
		* La ejecución asincrona de este método hace uso de una función callback 
		* que recibe como parametros: err y user.
		*/			
		User.findOne({uid: id}, function(err, user){
			/*
			* Si internamente se produce un error, se llama al próximo middleware 
			* que controla los errores, pasandole un mensaje.
			*/	
			if (err){
				next({name: 'internal', message: 'Error find resource.'});
			}

			/*
			* Si el objeto user encontrado existe se procede a eliminarlo.
			* Sino se devuelve al middleware de error un error de recurso no encontrado. 
			*/
			if (user){
				/*
				* Se llama al método remove de la instancia del model user obtenido. 
				* El callback que recibe como parametro el error que se produzca al 
				* eliminarlo de la colección, y si no se recibe algún error significa 
				* que hemos eliminado el documento correctamente.
				*/
				user.remove(function(err){
					/*
					* Si internamente se produce un error, se llama al próximo middleware 
					* que controla los errores, pasandole un mensaje.
					*/	
					if (err){
						next({name: 'internal', message: 'Error delete resource.'});
					}

					//Devolvemos en el HTTP response correspondiente.
					response.status(
						users_responses.delete.code
						).send(users_responses.delete.message);
				});
			}
			else {
				next({name: 'not_found'});
			}
		});
	}

};