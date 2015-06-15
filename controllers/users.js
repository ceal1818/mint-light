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
		* de este método hace uso de una función callback que le pasamos como 
		* parametros: err y count.
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
	
	list: function(request, response, next){
		User.find({}, function(err, users){
			if (err){
				next({name: 'internal', message: 'Error list resources.'});
			}
			response.status(
				users_responses.get.code
				).json(users);
		});
	},

	getById: function(request, response, next){
		var id = parseInt(request.params.id);
		User.findOne({uid: id}, function(err, user){
			if (err){
				next({name: 'internal', message: 'Error find resource.'});
			}

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

	update: function(request, response, next){
		var id = parseInt(request.params.id),
			userJson = request.body;
		User.findOne({uid: id}, function(err, user){
			if (err){
				next({name: 'internal', message: 'Error find resource.'});
			}

			if (user){
				User.update({_id: user._id}, userJson, {}, function(err, raw){
					if (err){
						next({name: 'internal', message: 'Error update resource.'});
					}

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

	delete: function(request, response, next){
		var id = parseInt(request.params.id);
		
		User.findOne({uid: id}, function(err, user){
			if (err){
				next({name: 'internal', message: 'Error find resource.'});
			}

			if (user){
				user.remove(function(err){
					if (err){
						next({name: 'internal', message: 'Error delete resource.'});
					}

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