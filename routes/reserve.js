var express = require('express');
var route = express.Router();
var mongoose = require('mongoose');
var Suggestion = require('../models/suggestion')
var Post = require('../models/post');
var Complains = require('../models/complain');
var Event = require('../models/event');
var User = require('../models/User');
var { ensureAuthenticated } = require('../config/auth');

//Reserve On Event *
route.post('/:type/:id', ensureAuthenticated, (req, res) => {
	//check the post type
	//find post by Id
		Event.findById(req.params.id, (err, found) => {
			//check if user is already reserved
			if(found.reserveUser.indexOf(req.user) == -1){
				found.reserveUser.push(req.user);
				found.save()
				res.redirect("/home")
			} else {
				res.sendStatus(400)
			}
		})
});

module.exports = route

