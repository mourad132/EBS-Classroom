var express = require('express');
var route = express.Router();
var mongoose = require('mongoose');
var Suggestion = require('../models/suggestion')
var Post = require('../models/post');
var Complains = require('../models/complain');
var Event = require('../models/event');
var { ensureAuthenticated } = require('../config/auth');

//Events page
route.get('/', (req, res) => {
	Event.find({type: "Repeated"}, (err, found) => {
		if(err){
			console.log(err)
		} else {
			//renders events Page
			res.render("eventsPage", {events: found, page: "Events"})
		}
	})
});

module.exports = route
