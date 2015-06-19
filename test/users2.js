/*
var _ = require('underscore'),
	chai = require('chai'),
	sinon = require('sinon'),
	assert = chai.assert,
	users_controller = require('../controllers/users')
	ListUsersService = require('../services/users/list');

var users = [
        		{"first_name": "test1", "last_name": "test1", "email": "test@test.com", "uid":1},
        		{"first_name": "test2", "last_name": "test2", "email": "test@test.com", "uid":2}
        	];

describe("Test Users Controller: ", function(){
	describe("List users ", function(){
		it("should respond", function(){
			var req = {}, 
				resp = {
					json: function(json){},
					status: function(status){}
				}, 
				next = function(){},
        		spy1 = sinon.spy(resp, "status"),
        		spy2 = sinon.spy(resp, "json");

        	resp.status(200);
        	resp.json(users);

        	spy1.withArgs(200);
        	spy2.withArgs(users);

			assert(spy1.calledWith(200));
        	assert(spy2.calledWith(users));
		});
	});
});
*/