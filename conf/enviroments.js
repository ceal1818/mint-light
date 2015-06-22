//Enum de configuración de base de datos MongoDB.
var conf = {

	dev: {
		morgan: true,
		db:{
			uri: 'mongodb://localhost/mint'
		}
	},

	pro: {
		morgan: true,
		db:{
			uri: 'mongodb://localhost/mint'
		}
	},

	test: {
		morgan: false,
		db:{
			uri: 'mongodb://localhost/mint_test'
		}
	}

};

module.exports = function(env){
	return conf[env];
};