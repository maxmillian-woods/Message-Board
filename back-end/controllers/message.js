var Message = require('../Models/Message');
// getting the username of the poster but not the password
module.exports = {
	get: (req, res) => {
		Message.find({}).populate('user', '-pwd').exec((err, result) => {
			res.send(result);
	});
},
	// posting users message
	post: (req, res) => {
		console.log(req.body, req.user);
		req.body.user = req.user;
		var message = new Message(req.body);
		message.save();
		res.status(200);
	}
}