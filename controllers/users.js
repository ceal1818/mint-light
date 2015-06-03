var User = require('../models/user'),
	_ = require('underscore');

module.exports = {

	create:function(request, response){
		var userJson = request.body;
		User.count({}, function(err, count){
			if (err){
				throw err;
			}
			
			_.extend(userJson, {uid: (count + 1)});
			var user = new User(userJson);

			user.save(function(err){
				if (err){
					throw err;
				}
				response.status(201).json(userJson);
			});
		});
	},
	
	list: function(request, response){
		User.find({}, function(err, users){
			if (err){
				throw err;
			}
			response.json(users);
		});
	},

	getById: function(request, response){
		var id = parseInt(request.params.id);
		User.find({uid: id}, function(err, user){
			if (err){
				throw err;
			}
			response.json(user);
		});
	}

};