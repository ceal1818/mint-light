var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	uid: Number,
	first_name: String,
	last_name: String,
	email: String
});

module.exports = mongoose.model('users', UserSchema);