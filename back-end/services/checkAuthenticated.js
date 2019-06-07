var jwt = require('jwt-simple');
var moment = require('moment');
// sending an error if someone tries to post without being logged in, in other words if they do not have an authorization header
module.exports = function checkAuthenticated(req, res, next){
	if (!req.header('Authorization')) {
		return res.status(418).send({
			message: 'Please make sure your request has an authorization header'
		});
	}
	var token = req.header('Authorization').split(' ')[1];
	var payload = jwt.decode(token, 'secret');
	// setting an experation date for the sattelizer tokens
	if (payload.exp <= moment().unix()) {
		return res.status(401).send({
			message: 'Token has expired.'
		});
	}
	req.user = payload.sub;
	// moving on if all is authenticated
	next();
}