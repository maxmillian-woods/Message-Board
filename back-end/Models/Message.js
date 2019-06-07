var mongoose = require('mongoose');
// setting up our message as a JSON object, message being a string and the user is the object id of our token
module.exports = mongoose.model('Message', {
	msg: String,
	user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});