var express = require('express');
var route = express.Router();
var mongoose = require('mongoose');
var Suggestion = require('../models/suggestion')
var Post = require('../models/post');
var Complains = require('../models/complain');
var Event = require('../models/event');
var User = require('../models/User');
var { ensureAuthenticated } = require('../config/auth');

//Voting Route
route.post('/:type/:id', (req, res) => {
	//find suggestion using id
	Suggestion.findById(req.params.id, (err, found) => {
		//if there is an error
		if(err){
			//print it out
			console.log(err)
		} else {
				//if it is by person then..
				//search for the user
				//if he is not in the list then let him vote
				if(found.voteArr.indexOf(req.user._id) == -1){
					found.voteArr.push(req.user._id)
					found.voteArr.push({user: req.user._id, vote: req.params.type, id: req.user._id})
					found.save()
					res.redirect('/home')
				} else {
					//if he already voted
					//then do nothing
					res.sendStatus(400)
				}
		}
	})
});

module.exports = route
