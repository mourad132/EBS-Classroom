var express = require('express');
var route = express.Router();
var mongoose = require('mongoose');
var { ensureAuthenticated } = require('../config/auth');


// files Route
route.get('/', (req, res) => {
    gfs.files.find(req.user._id, (err, files) => {
      // Files exist
      console.log(files)
    }
  )});

//Delete Files Route
route.delete('/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
      //redirects to the upload photo profile
      res.redirect('/photo');
    });
  });

  // Display Single File Route
route.get('/:filename', (req, res) => {
	//search for file
  gfs.files.findOne({ _id: req.user._id }, (err, file) => {
    // Check if it is a file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file);
  });
});

module.exports = route
