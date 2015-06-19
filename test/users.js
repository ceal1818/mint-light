var _ = require('underscore'),
	request = require('supertest'),
	chai = require('chai'),
	app = require('../app'),
	fields_valid = ["first_name", "last_name", "email", "uid"],
	user1 = {"first_name": "test1", "last_name": "test1", "email":"test1@test.com"},
	user2 = {"first_name": "test2", "last_name": "test2", "email":"test2@test.com"},
	user3 = {"first_name": "test3 test3", "last_name": "test3 test3", "email":"test1@test.com"},
	user4 = {"first_name": "test4", "last_name": "test4", "email":"test2@test.com"};

app.listen(3000);

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
					_.forEach(fields_valid, function(field_valid){
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
				.send(user1)
				.expect(201, done);
		});
		it("Response is JSON format and contains all users fields, when this service executed successfully.", function(done){
			request(app)
				.post('/users')
				.send(user2)
				.expect('Content-Type',/json/)
				.end(function(err, resp){
					if (err){
						throw err;
					}
					var assert = chai.assert;
					assert(resp.status, 201);
					_.forEach(fields_valid, function(field_valid){
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
				.send(user3)
				.expect(200, done)
		});

		it("HTTP status is equal to 404, when it don't found.", function(done){
			request(app)
				.put('/users/99999999')
				.send(user4)
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
				.put('/users/99999999')
				.send(user4)
				.expect(404, done);
		});
	});
});
