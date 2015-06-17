var _ = require('underscore'),
	user_model = require('../../models/user'),
	get_response = require('../../enums/rest-responses').users.get;

var ListUsersService = function(){
};

ListUsersService.prototype = _.extend(ListUsersService.prototype, {
	model: user_model,

	execute: function(data, success, unsuccess){
		var conditions = (data) ? data : {};
		this.model.find(conditions, function(err, models){		
			if (err){
				unsuccess({name: 'internal', message: 'Error list resources.'});
			}
			success(get_response.code, models);
		});
	}
});

module.exports = ListUsersService;