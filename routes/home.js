var express = require('express');
var route = express.Router();
var mongoose = require('mongoose');
var Suggestion = require('../models/suggestion')
var Post = require('../models/post');
var Complain = require('../models/complain');
var Event = require('../models/event');
var { ensureAuthenticated } = require('../config/auth');

//Home Page *
route.get("/", ensureAuthenticated, (req, res) => {
	// find all Suggestions
	Suggestion.find({}, (err, found) => {
		//if there is an error
		if(err){
			//print it out
			console.log(err)
		} else {
			// find all posts 
	Post.find({}, (err, posts) => {
				//if there is an error
		if(err){
			//print it out
			console.log(err)
		} else {
		// find all complains
			Complain.find({}, (err, complains) => {
		//if there is an error
		if(err){
		// print it out
			console.log(err)
		} else {
							Event.find({}, (err, events) => {
								//if there is an error
							if(err){
								//print it out
								console.log(err)
							} else {
								// reverse suggestions to be from newest
								const invsuggestion = found.reverse();
								// reverse posts to be from newest
									const invposts = posts.reverse();
								// reverse complains to be from newest
									const invcomplain = complains.reverse();
								// reverse events to be from newest
									const invevents = events.reverse(); 
								//renders the home page and sends all posts, suggestions, etc... along
									res.render("home", {suggestions: invsuggestion, posts: invposts, complains: invcomplain, events: invevents, user: req.user, page: "home"})
							}
						})
					}
				})
			}})
		}})
	})

module.exports = route
