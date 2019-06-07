var express = require('express');
var app = express();
var port = 8080;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dbName = 'test';
var url = 'mongodb://localhost:27017/' + dbName;
var auth = require('./controllers/auth');
var message = require('./controllers/message');
var checkAuthenticated = require('./services/checkAuthenticated')
var cors = require('./services/cors')
// this file has been modularized for neatness, see other files 
app.use(bodyParser.json());

//reseting headers to allow CORS. 
app.use(cors);

app.get('/api/message', message.get);

app.post('/api/message', checkAuthenticated, message.post);

app.post('/auth/register', auth.register);

app.post('/auth/login', auth.login);

mongoose.connect(url, (err, db) => {
	if (err){
		return console.log('Error: ' + err);
	}
	console.log('Connected to database: ' + dbName);
	
});

var server = app.listen(port, () => {
	console.log('server is listening on port %s', port);
});
