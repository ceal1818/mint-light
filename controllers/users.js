var model = require('../models/user');

module.exports = {
	
	list: function(request, response){
		model.find({}, function(err, users){
			if (err){
				throw err;
			}
			response.json(users);
		});
	},

	getById: function(request, response){
		var id = parseInt(request.params.id);
		model.find({uid: id}, function(err, user){
			if (err){
				throw err;
			}
			response.json(user);
		});
	}

};