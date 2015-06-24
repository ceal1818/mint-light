var _ = require('underscore'),
	post_response = require('../../../enums/rest-responses').users.post,
	Service = require('../../../core/service'),
	CreateUserService = function(){};

CreateUserService.prototype = _.extend({

	execute: function(data, success, unsuccess){
		var that = this;

		this.getModel().findOne().sort('-uid').exec(function(err, model){
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
			var next_id = (model) ? model.uid + 1: 1;
			_.extend(data, {uid: next_id});
			//Instanciamos un model mongoose User con los datos del JSON.
			var user = that.createModelInstance(data);
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
}, Service.prototype)

module.exports = CreateUserService;