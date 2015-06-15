var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var db_conf = require('./conf/db-conf');
var logger = require('./utils/logger');
var users = require('./routes/users');
var m_error = require('./middlewares/errors');

mongoose.connect(db_conf.uri, function(err, response){
	if (err){
		throw err;
	}
	console.log('Connecting');
});

var app = express();

app.use(bodyParser.json());
app.use(logger);

app.use('/users', users);
app.use(m_error);

app.listen(4000, function(){
	console.log("wow!!");
});