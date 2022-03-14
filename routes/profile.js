var express = require('express');
var route = express.Router();
var mongoose = require('mongoose');
var Suggestion = require('../models/suggestion')
var Post = require('../models/post');
var Complains = require('../models/complain');
var Event = require('../models/event');
var User = require('../models/User');
var { ensureAuthenticated } = require('../config/auth');

//Profile Route
route.get('/:id', (req, res) => {
	//find user using id
	User.findById(req.params.id, function(err, found){
		if(err){
			console.log(err)
		} else {
			//find another users in the user unit
			User.find({apartment: found.apartment}, (err, related) => {
				if(err){
					console.log(err)
				} else {
					//init relatives
					const relative  = [];
					//loop through relatives
					related.forEach(relate => {
						if(relate._id == found._id){
							relative.push(relate)
							relative.pop()
						} else {
							relative.push(relate)
						}
					})
					//render profile
					res.render("profile" , {profile: found, related: relative, user: req.user, unit: [], page: "Profile"})
				}
			})
		} 
    }) 
})

//PROFILES Route @GET
route.get('/', ensureAuthenticated, function(req, res){
	//Regex Search
		if(req.query.name){
		var noMatch = null;
        const regex = new RegExp(escapeRegex(req.query.name), 'gi');
        // Get all profiles from DB
        User.find({name: regex}, function(err, users){
           if(err){
               console.log(err);
           } else {
              if(users.length < 1) {
                  noMatch = "No Profiles match that search, please try again.";
              }
              res.render("profiles", {profiles: users, noMatch: noMatch, user: req.user, page: "Profiles"});
           }
        });
	} else if(req.query.username) {
		var noMatch = null;
        const regex = new RegExp(escapeRegex(req.query.username), 'gi');
        // Get all profiles from DB
        User.find({username: regex}, function(err, users){
           if(err){
               console.log(err);
           } else {
              if(users.length < 1) {
                  noMatch = "No profiles match that query, please try again.";
              }
              res.render("profiles", {profiles: users, noMatch: noMatch, user: req.user, page: "Profiles"});
           }
        });
	} else if(req.query.apartment) {
		var noMatch = null;
        // Get all profiles from DB
        User.find({apartment: "U-606"}, function(err, users){
           if(err){
               console.log(err);
           } else {
              if(users.length < 1) {
                  noMatch = "No profiles match that query, please try again.";
              }
              res.render("profiles", {profiles: users, noMatch: noMatch, user: req.user, page: "Profiles"});
           }
        });
	} else if (req.query.number){
		var noMatch = null;
        // Get all profiles from DB
        User.find({number: req.query.number}, function(err, users){
           if(err){
               console.log(err);
           } else {
              if(users.length < 1) {
                  noMatch = "No profiles match that query, please try again.";
              }
              res.render("profiles", {profiles: users, noMatch: noMatch, user: req.user, page: "Profiles"});
           }
        });
	} else {
		 // Get all profiles from DB
        User.find({}, function(err, profiles){
           if(err){
               console.log(err);
           } else {
              res.render("profiles",{profiles: profiles, noMatch: noMatch, user: req.user, page: "Profiles"});
           }
        });
    }
});

module.exports = route
