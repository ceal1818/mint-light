var _ = require('underscore'),
	user_model = require('../../models/user'),
	delete_response = require('../../enums/rest-responses').users.delete;

var DeleteUserService = function(){
};

DeleteUserService.prototype = _.extend(DeleteUserService.prototype, {
	model: user_model,

	execute: function(data, success, unsuccess){
		var conditions = {};

		if (!data || _.isEmpty(data)){
			unsuccess({name: 'internal', message: "Doesn't exist conditions"});
		} else {
			conditions = data;
		}

		this.model.findOne(conditions, function(err, model){
			/*
			* Si internamente se produce un error, se llama al próximo middleware 
			* que controla los errores, pasandole un mensaje.
			*/	
			if (err){
				unsuccess({name: 'internal', message: 'Error find resource.'});
			}
			/*
			* Si el objeto user encontrado existe se procede a eliminarlo.
			* Sino se devuelve al middleware de error un error de recurso no encontrado. 
			*/
			if (model){
				/*
				* Se llama al método remove de la instancia del model user obtenido. 
				* El callback que recibe como parametro el error que se produzca al 
				* eliminarlo de la colección, y si no se recibe algún error significa 
				* que hemos eliminado el documento correctamente.
				*/
				model.remove(function(err){
					/*
					* Si internamente se produce un error, se llama al próximo middleware 
					* que controla los errores, pasandole un mensaje.
					*/	
					if (err){
						unsuccess({name: 'internal', message: 'Error delete resource.'});
					}
					//Devolvemos en el HTTP response correspondiente.
					success(delete_response.code, delete_response.message);
				});
			}
			else {
				unsuccess({name: 'not_found'});
			}
		});
	}
});

module.exports = DeleteUserService;