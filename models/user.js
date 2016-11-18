var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	username: String,
	password: String,
	email: String
}, {
	timestamps: true
});

module.exports = mongoose.model('User', schema);