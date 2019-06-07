// importing our user script to use here aswell as jwt for encoding and moment for time stamps
var User = require('../Models/User');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {
    // verifying that the user has not already registered, if user has we will send a 404 error, if not then a satellizer token is created
    register: (req, res) => {
        User.findOne({
            email: req.body.email
        }, (err, existingUser) => {
        	if (existingUser) {
        		return res.status(409).send({
        			message: 'Email is already registered.'
        		});
        	}
            var user = new User(req.body);
            user.save((err, result) => {
                if (err) {
                    return res.status(500).send({
                        message: err.message
                    });
                } else {
                    res.status(200).send({
                    	token: createToken(user)
                    });
                }
            });
        });
    },
    // login verification comparing inputed email with ones stored in our database, then comparing passwords
    login: (req, res) => {
        User.findOne({
            email: req.body.email
        }, (err, user) => {
            if (!user) {
                return res.status(401).send({
                    message: 'Email and/or Password invalid.'
                });
            } 
            if (req.body.pwd == user.pwd) {
                return res.status(200).send({
                    token: createToken(user)
                });
            } else {
                res.status(401).send({
                    message: 'invalid Email and/or Password.'
                });
            }
        })
    }
}

// satellizer token creator script
function createToken(user) {
	var payload = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(14, 'days').unix()
	}
	return jwt.encode(payload, 'secret');
}
