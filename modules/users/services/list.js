var _ = require('underscore'),
	get_response = require('../../../enums/rest-responses').users.get,
	Service = require('../../../core/service'),
	ListUsersService = function(){};

ListUsersService.prototype = _.extend({
	
	execute: function(data, success, unsuccess){
		var conditions = (data) ? data : {};
		this.getModel().find(conditions, function(err, models){		
			if (err){
				unsuccess({name: 'internal', message: 'Error list resources.'});
			}
			success(get_response.code, models);
		});
	}

}, Service.prototype);

module.exports = ListUsersService;