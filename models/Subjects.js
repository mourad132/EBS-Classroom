var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	name: String,
	branches: [],
	posts: [],
	teacher: String,
})