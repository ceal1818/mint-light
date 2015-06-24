var _ = require('underscore'),
	user_model = require('../../../models/user'),
	get_response = require('../../../enums/rest-responses').users.get;

var GetUserService = function(){
};

GetUserService.prototype = _.extend(GetUserService.prototype, {
	model: user_model,

	execute: function(data, success, unsuccess){
		var conditions = {};

		if (!data || _.isEmpty(data)){
			unsuccess({name: 'internal', message: "Doesn't exist conditions"});
		} else {
			conditions = data;
		}

		this.model.findOne(conditions, function(err, model){		
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
});

module.exports = GetUserService;