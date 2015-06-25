var CreateUserService = require('../services/create'),
	GetUserService = require('../services/get'),
	ListUsersService = require('../services/list'),
	UpdateUserService = require('../services/update'),
	DeleteUserService = require('../services/delete'),
	user_model = require('../../../models/user');

//Exportamos el objeto controller.
module.exports = { 
	
	/*
	* create Método encargado de crear una instancia de una entidad user.
	*/
	create: function(request, response, next){
		//Se obtiene el body del request de user.
		var userJson = request.body,
			service = new CreateUserService();
		service.setModel(user_model);

		service.execute(
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
		var service = new ListUsersService();
		service.setModel(user_model);

		service.execute(
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
			service = new GetUserService();
		service.setModel(user_model);

		service.execute(
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
			service = new UpdateUserService();
		service.setModel(user_model);

		service.execute(
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
			service = new DeleteUserService(user_model);
		service.setModel(user_model);
		
		service.execute(
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