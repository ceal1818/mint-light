var express = require('express');
var mongoose = require('mongoose');

var dbConf = require('./conf/dbConf');
var logger = require('./utils/logger');
var users = require('./routes/users');

mongoose.connect(dbConf.uri, function(err, response){
	if (err){
		throw err;
	}
	console.log('Connecting');
});

var app = express();

app.use(logger);
app.use('/users', users);

app.listen(4000, function(){
	console.log("wow!!");
});