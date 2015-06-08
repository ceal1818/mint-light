var User = require('../models/user'),
	responses = require('../enums/rest-responses');
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

				response.status(
					responses.users.post.code
					).json(userJson);
			});
		});
	},
	
	list: function(request, response){
		User.find({}, function(err, users){
			if (err){
				throw err;
			}
			response.status(
				responses.users.get.code
				).json(users);
		});
	},

	getById: function(request, response){
		var id = parseInt(request.params.id);
		User.findOne({uid: id}, function(err, user){
			if (err){
				throw err;
			}

			if (user){
				response.status(
					responses.users.get.code
					).json(user);	
			}
			else {
				response.status(
					responses.errors.not_found.code
					).send(responses.errors.not_found.message);
			}
		});
	},

	update: function(request, response){
		var id = parseInt(request.params.id),
			userJson = request.body;
		User.findOne({uid: id}, function(err, user){
			if (err){
				throw err;
			}

			if (user){
				User.update({_id: user._id}, userJson, {}, function(err, raw){
					if (err){
						throw err;
					}
					response.status(
						responses.users.put.code
						).send(responses.users.put.message);
				});
			}
			else {
				response.status(
					responses.errors.not_found.code
					).send(responses.errors.not_found.message);
			}
		});
	},

	delete: function(request, response){
		var id = parseInt(request.params.id);
				User.findOne({uid: id}, function(err, user){
			if (err){
				throw err;
			}

			if (user){
				user.remove(function(err){
					if (err){
						throw err;
					}
					response.status(
						responses.users.delete.code
						).send(responses.users.delete.message);
				});
			}
			else {
				response.status(
					responses.errors.not_found.code
					).send(responses.errors.not_found.message);
			}
		});
	}

};