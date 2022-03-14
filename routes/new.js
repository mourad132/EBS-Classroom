var express = require('express');
var mongoose = require('mongoose');
var route = express.Router();
var Post = require('../models/post');
var Suggestion = require('../models/suggestion');
var Complain = require('../models/complain');
var Event = require('../models/event')
var { ensureAuthenticated } = require('../config/auth');

//Create New Page *
route.get("/", ensureAuthenticated, (req, res) => {
	//renders the 'create new' page
	res.render("new")
})

//Create New Route *
route.post('/post', ensureAuthenticated, function(req, res){
	//create new post
	Post.create({
		title: req.body.title,
		post: req.body.post,
		image: req.body.image,
		author: {image: req.user.photo, username: req.user.username, id: req.user._id},
		created: req.body.created,
		createdTime: req.body.createdTime,
	})
	//redirects to the home page
	res.redirect("/home")
})

//Add New Complain Page
route.get("/complain", (req, res) => {
	res.render("complains", {page: "New Complain"})
});

//Add new complain Route
route.post("/complain", (req, res) => {
	//create new complain
	Complain.create({
	title: req.body.title,
	body: req.body.body,
	created: req.body.created,
	createdTime: req.body.createdTime,
	author: {image: req.user.photo, username: req.user.username, id: req.user._id},
	type: req.body.type,
	status: 'In Progress',
	})
	//redirect to the home page
	res.redirect("/home")
})

//New Event Page
route.get('/event', ensureAuthenticated, (req, res) => {
	//renders new event page
	res.render("event", {page: "New Event"})
});

//New Event Route
route.post('/event', (req, res) => {
	//create new event
	Event.create({
		title: req.body.title,
		body: req.body.body,
		created: req.body.created,
		createdTime: req.body.createdTime,
		author: {image: req.user.photo, username: req.user.username, id: req.user._id},
		type: req.body.type,
		comments: [],
		reserve: [],
	})
	//redirect to the home page
	res.redirect('/home')
});

//New Suggestion Route *
route.post("/suggestion", (req, res) => {
	//create new suggestion
		Suggestion.create({
			image: req.body.image,
			agree: 0,
			disagree: 0,
			body: req.body.body,
			title: req.body.title,
			author: {image: req.user.photo, username: req.user.username, id: req.user._id},
			commentsNum: 0,
			created: req.body.created, 
			createdTime: req.body.createdTime,
			vote: true,
			voteBy: req.body.voteBy,
			voters: [],
			comments: [],
		})
		//redirect to the home page
	res.redirect('/home')
});

route.get('/suggestion', (req, res) => {
	res.render('suggestion')
})

module.exports = route
