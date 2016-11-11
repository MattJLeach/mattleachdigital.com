var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
	title: {type: String, required: true},
	slug: {type: String, required: true, unique: true},
	status: {type: String},
	publishedDate: {type: Date},
	body: {type: String}
}, {
	timestamps: true
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Post', schema);