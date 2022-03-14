var express = require('express');
var route = express.Router();
var mongoose = require('mongoose');
var Suggestion = require('../models/suggestion')
var Post = require('../models/post');
var Complain = require('../models/complain');
var Event = require('../models/event');
var User = require('../models/User');
var { ensureAuthenticated } = require('../config/auth');

//Delete Route
route.delete("/:type/:id", (req, res) => {
	//check the post type
	if(req.params.type == "suggestion"){
		//find the post and delete it
		Suggestion.findByIdAndDelete(req.params.id, (err, found) => {
			if(err){
				console.log(err)
			} else {
				//then redirect to the home page again
				res.redirect("/home#" + req.params.type)
			}
		})
	} else if(req.params.type == "complain"){
		Complain.findByIdAndDelete(req.params.id, (err, found) => {
			if(err){
				console.log(err)
			} else {
				res.redirect("/home#" + req.params.type)
			}
		})
	} else if(req.params.type == "service"){
		Service.findByIdAndDelete(req.params.id, (err, found) => {
			if(err){
				console.log(err)
			} else {
				res.redirect("/home#" + req.params.type)
			}
		})
	} else if(req.params.type == "event"){
		Event.findByIdAndDelete(req.params.id, (err, found) => {
			if(err){
				console.log(err)
			} else {
				res.redirect("/home#" + req.params.type)
			}
		})
	} else if(req.params.type == "post"){
		Post.findByIdAndDelete(req.params.id, (err, found) => {
			if(err){
				console.log(err)
			} else {
				res.redirect("/home#" + req.params.type)
			}
		})
	} else {
		res.sendStatus(400)
	}
});

//Delete Post Route
route.get("/:id", ensureAuthenticated,function(req, res){
	Post.findByIdAndDelete(req.params.id, function(err, destroyed){
		if(err){
			console.log(err)
		} else {
			res.redirect("/home")
		}
	})
});

module.exports = route
