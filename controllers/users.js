var User = require('../models/user'),
	users_responses = require('../enums/rest-responses').users;
	_ = require('underscore');


module.exports = { 

	create: function(request, response, next){
		var userJson = request.body;
		User.count({}, function(err, count){
			if (err){
				next({name: 'internal', message: 'Error count resources.'});
			}
			
			_.extend(userJson, {uid: (count + 1)});
			var user = new User(userJson);

			user.save(function(err){
				if (err){
					next({name: 'internal', message: 'Error save resource.'});
				}

				response.status(
					users_responses.post.code
					).json(userJson);
			});
		});
	},
	
	list: function(request, response, next){
		User.find({}, function(err, users){
			if (err){
				next({name: 'internal', message: 'Error list resources.'});
			}
			response.status(
				users_responses.get.code
				).json(users);
		});
	},

	getById: function(request, response, next){
		var id = parseInt(request.params.id);
		User.findOne({uid: id}, function(err, user){
			if (err){
				next({name: 'internal', message: 'Error find resource.'});
			}

			if (user){
				response.status(
					users_responses.get.code
					).json(user);	
			}
			else {
				next({name: 'not_found'});
			}
		});
	},

	update: function(request, response, next){
		var id = parseInt(request.params.id),
			userJson = request.body;
		User.findOne({uid: id}, function(err, user){
			if (err){
				next({name: 'internal', message: 'Error find resource.'});
			}

			if (user){
				User.update({_id: user._id}, userJson, {}, function(err, raw){
					if (err){
						next({name: 'internal', message: 'Error update resource.'});
					}

					response.status(
						users_responses.put.code
						).send(users_responses.put.message);
				});
			}
			else {
				next({name: 'not_found'});
			}
		});
	},

	delete: function(request, response, next){
		var id = parseInt(request.params.id);
		
		User.findOne({uid: id}, function(err, user){
			if (err){
				next({name: 'internal', message: 'Error find resource.'});
			}

			if (user){
				user.remove(function(err){
					if (err){
						next({name: 'internal', message: 'Error delete resource.'});
					}

					response.status(
						users_responses.delete.code
						).send(users_responses.delete.message);
				});
			}
			else {
				next({name: 'not_found'});
			}
		});
	}

};