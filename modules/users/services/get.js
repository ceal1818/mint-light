var _ = require('underscore'),
	get_response = require('../../../enums/rest-responses').users.get,
	Service = require('../../../core/service'),
	GetUserService = function(){};

GetUserService.prototype = _.extend({

	execute: function(data, success, unsuccess){
		var conditions = {};

		if (!data || _.isEmpty(data)){
			unsuccess({name: 'internal', message: "Doesn't exist conditions"});
		} else {
			conditions = data;
		}

		this.getModel().findOne(conditions, function(err, model){		
			if (err){
				unsuccess({name: 'internal', message: 'Error list resources.'});
			}

			if (model){
				success(get_response.code, model);	
			}
			else {
				unsuccess({name: 'not_found'});
			}
			
		});
	}
}, Service.prototype);

module.exports = GetUserService;