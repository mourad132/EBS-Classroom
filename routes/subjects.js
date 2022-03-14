var express = require('express');
var route = express.Router();
var Subjects = require('../models/Subjects');
var ensureAuthenticated = require('../config/auth')

// Get All Subjects
route.get('/', ensureAuthenticated, (req, res) => {
	Subjects.find({}, (err, found) => {
		if(err){
			console.log(err)
		} else {
			res.render('subjects', { subjects: subjects });
		}
	})
});

// Post A Checkpoint
route.post('/:subject', ensureAuthenticated, (req, res) => {
	Subjects.find({ name: req.params.subject }, (err, found) => {
		if(err){
			throw err
		} else {
			if(req.user._id == found.teacher){
				var post = {...req.body};
				found.posts.push(post);
				found.save();             
			}
		}
	});
});

// Get Specific Subject
route.get('/:subject', ensureAuthenticated, (req, res) => {
	Subjects.find({ name: req.params.subject}, (err, found) => {
		if(err){
			throw err 
		} else {
			User.findById(found._id, (err, teacher) => {
				if(err){
					throw err
				} else {
					res.render('subject', { subject: found, teacher })
				}
			})
		}
	})
});

//Create New Subject
route.post('/new', ensureAuthenticated, (req, res) => {
	if(req.user._id == ""){
		Subjects.create({...req.body}, (err, created) => {
			if(err){
				throw err
			} else {
				console.log(`===> Created New Subject: ${created.name}`)
				res.redirect(`/subjects/${created.name}`);
			}
		})
	} else {
		res.redirect('/subjects');
	}
});