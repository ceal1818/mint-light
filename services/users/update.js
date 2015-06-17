var _ = require('underscore'),
	user_model = require('../../models/user'),
	put_response = require('../../enums/rest-responses').users.put;

var UpdateUserService = function(){
};

UpdateUserService.prototype = _.extend(UpdateUserService.prototype, {
	model: user_model,

	execute: function(data, success, unsuccess){
		var conditions = data.conditions, 
			user_data = data.object,
			that = this;
		/*
		* Se llama al método findOne del model mongoose con el argumento uid igual al 
		* ID obtenido, que devuelve solo una única ocurrencia en la colección user. 
		* La ejecución asincrona de este método hace uso de una función callback 
		* que recibe como parametros: err y user.
		*/	
		this.model.findOne(conditions, function(err, user){
			/*
			* Si internamente se produce un error, se llama al próximo middleware 
			* que controla los errores, pasandole un mensaje.
			*/	
			if (err){
				unsuccess({name: 'internal', message: 'Error find resource.'});
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
				that.model.update({_id: user._id}, user_data, {}, function(err, raw){
					/*
					* Si internamente se produce un error, se llama al próximo middleware 
					* que controla los errores, pasandole un mensaje.
					*/	
					if (err){
						unsuccess({name: 'internal', message: 'Error update resource.'});
					}
					//Devolvemos en el HTTP response el HTTP status adecuado y el documento actualizado.
					success(put_response.code, put_response.message);
				});
			}
			else {
				unsuccess({name: 'not_found'});
			}
		});
	}
});

module.exports = UpdateUserService;