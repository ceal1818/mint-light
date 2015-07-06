var user_model = require('../../../models/user');

//Exportamos el objeto controller.
module.exports = {

	routes: {
		'GET /' : 'list',
		'POST /' : 'create',
		'GET /:id': 'get',
		'PUT /:id': 'update',
		'DELETE /:id': 'remove'		
	},
	/*
	* create Método encargado de crear una instancia de una entidad user.
	*/
	create: function(request, response, next){
		//Se obtiene el body del request de user.
		var userJson = request.body,
			service = new this._services.create();
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
		var service = new this._services.list();
		service.setModel(user_model);
		debugger;
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
	* get Método encargado de devolver una entidad user por un ID especifico.
	*/
	get: function(request, response, next){
		var id = parseInt(request.params.id),
			service = new this._services.get();
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
			service = new this._services.update();
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
	remove: function(request, response, next){
		//Obtienes el ID del recurso variable que indicas en el querystring de la URL.
		var id = parseInt(request.params.id)
			service = new this._services.remove();
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