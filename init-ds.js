var mongoose = require('mongoose');

module.exports = function(conf){
	//Conexión a base de datos mongodb con datos de conexión proporcionados por un enum.
	mongoose.connect(conf.db.uri, function(err, response){
		if (err){
			throw err;
		}
	});
};