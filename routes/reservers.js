var express = require('express');
var route = express.Router();
var mongoose = require('mongoose');
var Suggestion = require('../models/suggestion')
var Post = require('../models/post');
var Complains = require('../models/complain');
var Event = require('../models/event');
var User = require('../models/User');
var { ensureAuthenticated } = require('../config/auth');

//Reserve On Event Page
route.get("/:type/:id", (req, res) => {
	//check post type
	//find post by id
	//renders reservers page
		Event.findById(req.params.id, (err, found) => {
			if(err){
				console.log(err)
			} else {
				res.render('reservers', {profiles: found.reserveUser, page: "Reserved Users"})
			}
		})
})

module.exports = route
