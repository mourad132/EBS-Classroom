var express = require('express');
var route = express.Router();
var mongoose = require('mongoose');
var Suggestion = require('../models/suggestion')
var Post = require('../models/post');
var Complains = require('../models/complain');
var Event = require('../models/event');
var User = require('../models/User');
var { ensureAuthenticated } = require('../config/auth');

//Voting Page
route.get('/:id', (req, res) => {
	//initiate yes & no variables
	let yes = 0;
	let no = 0;
	//find suggestion by id
	Suggestion.findById(req.params.id, (err, found) => {
		found.voteArr.forEach(vote => {
			if(vote.vote == "yes"){
				yes = yes + 1
			} else if(vote.vote == "no"){
				no = no + 1
			} else {
				return undefined
			}
		})
		res.render("voters", {yes: yes, no: no, page: "Voters"})
	})
});

module.exports = route
