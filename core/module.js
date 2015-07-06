var express = require('express'),
	_ = require('underscore'),
	path = require('path'),
	fs = require('fs'),
	Q = require('q');

function getControllers(module){
	var _files = undefined,
		_controllers = {}
		that = this;

	if (_.isEmpty(this.controllers)){
		_files = fs.readdirSync(path.join(process.cwd(), 'modules', module, 'controllers'));
			
		_.forEach(_files, function(_file){
			var filename = _file.substring(0, _file.indexOf("."));
			_controllers[filename] = require("../modules/"+module+'/controllers/'+filename);
		});

		getServices(module, _controllers);
	}

	return _controllers;
}

function getServices(module, controllers){
	var controllerNames = _.keys(controllers),
		_files = undefined,
		that = this;
	
	this._services = {};

	_files = fs.readdirSync(path.join(process.cwd(), 'modules', module, 'services'));

	_.forEach(_files, function(_file){
		var filename = _file.substring(0, _file.indexOf("."));
		_services[filename] = require("../modules/"+module+'/services/'+filename);
	});

	/*
	_.forEach(controllerNames, function(controllerName){
		if (_.has(_services, controllerName)){
			_.extend(controllers[controllerName], {
				service: _services[controllerName]
			});
		}
		else if (controllerName == "default"){
			var serviceNames = _.keys(controllers.default);
			
			controllers.default = _.extend(controllers.default, {
				services:{}
			});
			_.forEach(serviceNames, function(serviceName){
				if (_.has(_services, serviceName)){
					controllers.default.services[serviceName] = _services[serviceName];
				}
			});
		}
		else {
			console.log("error");
		}
	});
	*/
}

module.exports = {

	getRouter: function(){
		var controllers = getControllers(this.module);
		var controllerNames = _.keys(controllers);
		var router = express.Router();
		
		_.forEach(controllerNames, function(controllerName){
			var controller = controllers[controllerName],
				conf_routes = controller.routes,
				route_names = _.keys(conf_routes);

			_.forEach(route_names, function(route_name){
				var route = route_name.split(' '),
					method = conf_routes[route_name];

				switch(route[0]){
					case 'GET':
						router.route(route[1]).get(controller[method]);
						break;

					case 'POST':
						router.route(route[1]).post(controller[method]);
						break;

					case 'PUT':
						router.route(route[1]).put(controller[method]);
						break;

					case 'DELETE':
						router.route(route[1]).delete(controller[method]);
						break;
				}
			});
		});

		return router;
	}

};
