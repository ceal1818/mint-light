var _ = require('underscore'),
	mongoose = require('mongoose'),
	request = require('supertest'),
	chai = require('chai'),
	data = require('./data/users'),
	app;

before(function(){
	var init_app = require('../init-app'),
		init_ds = require('../init-ds'),
		conf = require('../conf/enviroments'),
		user_model = require('../models/user');

	init_ds(conf('test'));
	app = init_app(conf('test'));
	app.listen(300);

	user_model.remove({}, function(err){
		if (err){
			throw err;
		}
		
		var user = new user_model(data.user0);
		user.save(function(err){
			if (err){
				throw err;
			}
		});
	});

});

describe("Test users module: ", function(){

	describe("List users service: ", function(){
		it("HTTP status is equal to 200, when this service executed successfully.", function(done){
			request(app)
				.get('/users')
				.expect(200, done);
		});
		it("The response is JSON format, when this service executed successfully.", function(done){
			request(app)
				.get('/users')
				.expect('Content-Type',/json/, done);
		});	
	});

	describe("Get user by UID: ", function(){
		it("HTTP status is equal to 200, when this service executed successfully.", function(done){
			request(app)
				.get('/users/0')
				.expect(200, done);
		});
		it("The response is JSON format, when this service executed successfully.", function(done){
			request(app)
				.get('/users/0')
				.expect('Content-Type',/json/, done);
		});
		it("The user has all their fields.", function(done){
			request(app)
				.get('/users/0')
				.expect('Content-Type',/json/)
				.end(function(err, res){
					var assert = chai.assert;
					_.forEach(data.fields_valid, function(field_valid){
						assert.property(res.body, field_valid);
					});
					done();
				});
		});
		it("HTTP status is equal to 404, when it don't found.", function(done){
			request(app)
				.get('/users/99999999')
				.expect(404, done);
		});
	});

	describe("Create user: ", function(){
		it("HTTP status is equal to 201, when this service executed successfully.", function(done){
			request(app)
				.post('/users')
				.send(data.user1)
				.expect(201, done);
		});
		it("Response is JSON format and contains all users fields, when this service executed successfully.", function(done){
			request(app)
				.post('/users')
				.send(data.user2)
				.expect('Content-Type',/json/)
				.end(function(err, resp){
					if (err){
						throw err;
					}
					var assert = chai.assert;
					assert(resp.status, 201);
					_.forEach(data.fields_valid, function(field_valid){
						assert.property(resp.body, field_valid);
					});
					done();
				});
		});
	});

	describe("Update user: ", function(){
		it("HTTP status is equal to 200, when this service executed successfully.", function(done){
			request(app)
				.put('/users/1')
				.send(data.user3)
				.expect(200, done)
		});

		it("HTTP status is equal to 404, when it don't found.", function(done){
			request(app)
				.put('/users/99999999')
				.send(data.user4)
				.expect(404, done);
		});
	});

	describe("Delete user: ", function(){
		it("HTTP status is equal to 200, when this service executed successfully.", function(done){
			request(app)
				.del('/users/2')
				.end(function(err, resp){
					if (err){
						throw err;
					}
					var assert = chai.assert;
					assert(resp.status, 200);
					done();
				});
		});

		it("HTTP status is equal to 404, when it don't found.", function(done){
			request(app)
				.del('/users/99999999')
				.expect(404, done);
		});
	});
});
