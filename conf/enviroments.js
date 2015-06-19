//Enum de configuración de base de datos MongoDB.
module.exports = {
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
			uri: 'mongodb://localhost/mint-test'
		}
	}
};