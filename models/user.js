// Importar la librería de mongoose.
var mongoose = require('mongoose');

/*
* En mongoose es necesario crear un objeto Schema 
* que represanta el documento a almacenar en MongoDB.
*/
var UserSchema = new mongoose.Schema({
	uid: Number,
	first_name: String,
	last_name: String,
	email: String
});

//Instanciamos un objeto de model que representa un DAO para ese esquema especifico.
module.exports = mongoose.model('users', UserSchema);