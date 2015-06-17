var _ = require('underscore'),
	user_model = require('../../models/user'),
	post_response = require('../../enums/rest-responses').users.post;

var CreateUserService = function(){
};

CreateUserService.prototype = _.extend(CreateUserService.prototype, {
	model: user_model,

	execute: function(data, success, unsuccess){
		var that = this;

		this.model.count({}, function(err, count){
			/*
			* Si internamente se produce un error, se llama al próximo middleware 
			* que controla los errores, pasandole un mensaje.
			*/
			if (err){
				unsuccess({name: 'internal', message: 'Error count resources.'});
			}
			/*
			* Usamos la utilidad extend de underscore para extender el JSON 
			* que guardaremos en la colección users. Guardamos el UID que 
			* estamos generando.
			*/
			_.extend(data, {uid: (count + 1)});
			//Instanciamos un model mongoose User con los datos del JSON.
			var user = new that.model(data);
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
					unsuccess({name: 'internal', message: 'Error save resource.'});
				}
				//Devolvemos en el HTTP response el HTTP status adecuado y el documento creado.
				success(post_response.code, data);
			});
		});
	}
});

module.exports = CreateUserService;