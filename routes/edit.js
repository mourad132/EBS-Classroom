var express = require('express');
var route = express.Router();
var mongoose = require('mongoose');
var Suggestion = require('../models/suggestion')
var Post = require('../models/post');
var Complains = require('../models/complain');
var Event = require('../models/event');
var { ensureAuthenticated } = require('../config/auth');

//Edit Post Route *
route.get("/:type/:id", ensureAuthenticated, function(req, res){
	//initiate schema
	let schema;
	//check the post type
	// then assign schema to it
	if(req.params.type == "post"){
		schema = Post
	} else if(req.params.type == "service"){
		schema = Service
	} else if(req.params.type == "suggestion"){
		schema = Suggestion
	} else if(req.params.type == "event"){
		schema = Event
	} else if(req.params.type == "complain"){
		schema = Complain
	}
	
})

module.exports = route
