var express = require('express'),
	_ = require('underscore'),
	path = require('path'),
	fs = require('fs'),
	Q = require('q');

var Module = function(){
	
	this.name = undefined;
	this.controllers = {};

	function getControllers(){

	};

	function getServices(){

	};
	getControllers();
	getServices();
};

Module.prototype = _.extend(Module.prototype, {
	
	getRouter: function(){

	}

});

module.export = Module;