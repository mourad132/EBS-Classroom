var express = require('express');
var route = express.Router();
var mongoose = require('mongoose');
var Suggestion = require('../models/suggestion')
var Post = require('../models/post');
var Complains = require('../models/complain');
var Event = require('../models/event');
var { ensureAuthenticated } = require('../config/auth');

// prefix /comments

//Create New Comment Route *
route.post('/:type/:id', ensureAuthenticated, (req, res) => {
	//initiate schema
	let schema;
	//if the post type is 'post'
	if(req.params.type == "Post"){
		schema = Post;
	}
	//if the post type is 'Suggestion'  
	else if(req.params.type == "Suggestion"){
		schema = Suggestion;
	} 
	//if the post type is 'Event'
	else if(req.params.type == "Event"){
		schema = Event
	} 
	//if the post type is 'Complain'
	else if(req.params.type == "Complain"){
		schema = Complain 
	} else {
		//send status of 404 (not found)
		res.sendStatus(404)
	}
	//find the schema initiated above
	schema.findById(req.params.id, (err, found) => {
		//if there is an error
		if(err){
			//print it out
			console.log(err)
		} else {
			//add the new comment to the comments array(list) 
			found.comments.push({username: req.user.username, image: req.user.photo, body: req.body.comment, created: 					req.body.created, createdTime: req.body.createdTime})
			//save it
			found.save()
			//redirect the user to the home page(the targeted post)
			res.redirect("/home#" + req.params.id)
		}
})
});

module.exports = route