var _ = require('underscore'),
	object_model = undefined,
	Service = function(){
	};

Service.prototype = _.extend(Service.prototype, {
	
	setModel: function(model){
		object_model = model;
	},

	getModel: function(){
		return object_model;
	},
	
	createModelInstance: function(data){
		return (data) ? new object_model(data) : new object_model();
	}
});

module.exports = Service;