//Importamos el model mongoose user.
var User = require('../models/user'),
	//Importamos las constantes de respuesta users.
	users_responses = require('../enums/rest-responses').users,
	CreateUserService = require('../services/users/create'),
	GetUserService = require('../services/users/get'),
	ListUsersService = require('../services/users/list'),
	UpdateUserService = require('../services/users/update'),
	DeleteUserService = require('../services/users/delete'),
	//Importamos la librería underscore que es una utilidad para el uso de objetos, colecciones en JS.
	_ = require('underscore');

//Exportamos el objeto controller.
module.exports = { 

	/*
	* create Método encargado de crear una instancia de una entidad user.
	*/
	create: function(request, response, next){
		//Se obtiene el body del request de user.
		var userJson = request.body,
			createUserService = new CreateUserService();

		createUserService.execute(
			userJson, 
			function(code, user){
				response.status(code).json(user);
			}, 
			function(err){
				next(err);
			}
		);
	},
	
	/*
	* list Método encargado de devolver todas las instancias de la entidad user.
	*/
	list: function(request, response, next){
		var listUsersServices = new ListUsersService();

		listUsersServices.execute(
			{}, 
			function(code, users){
				response.status(code).json(users);
			}, 
			function(err){
				next(err);
			}
		);
	},

	/*
	* getById Método encargado de devolver una entidad user por un ID especifico.
	*/
	getById: function(request, response, next){
		var id = parseInt(request.params.id),
			getUserServices = new GetUserService();

		getUserServices.execute(
			{uid: id}, 
			function(code, user){
				response.status(code).json(user);
			}, 
			function(err){
				next(err);
			}
		);
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
			userJson = request.body,
			updateUserService = new UpdateUserService();

		updateUserService.execute(
			{
				conditions: {uid : id},
				object: userJson
			}, 
			function(code, message){
				response.status(code).send(message);
			}, 
			function(err){
				next(err);
			}
		);
	},

	/*
	* delete Método encargado de eliminar una entidad user por un ID especifico.
	*/
	delete: function(request, response, next){
		//Obtienes el ID del recurso variable que indicas en el querystring de la URL.
		var id = parseInt(request.params.id)
			deleteUserService = new DeleteUserService();;

		deleteUserService.execute(
			{uid : id},
			function(code, message){
				response.status(code).send(message);
			}, 
			function(err){
				next(err);
			}
		);
	}

};