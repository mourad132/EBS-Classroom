//Node Modules
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const path = require('path');
const crypto = require('crypto');
const moment = require('moment')
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
var passport = require("passport");
var methodOverride = require("method-override");
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
var passportLocalMongoose = require("passport-local-mongoose");
var localStrategy = require("passport-local").Strategy;
var app = express();
var conn = mongoose.createConnection('mongodb+srv://kbibi:Mrgamer1017$@cluster0-pkbkj.mongodb.net/Cluster0?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});


//Local Models
var { ensureAuthenticated } = require("./config/auth.js");
var Post = require("./models/post.js");
var User = require('./models/User.js');
const Service = require("./models/service.js");
const Event = require('./models/event.js');
const Suggestion = require("./models/suggestion.js");
const Complain = require("./models/complain.js");
var Subjects = require('./models/Subjects')

//routes
var voters = require('./routes/voters');
var edit = require('./routes/edit');
var deleteRoute = require('./routes/delete');
var comments = require('./routes/comments');
var event = require('./routes/event');
var files = require('./routes/files');
var home = require('./routes/home');
var image = require('./routes/image');
var newRoute = require('./routes/new');
var profile = require('./routes/profile');
var reservers = require('./routes/reservers');
var users = require('./routes/users');
var vote = require('./routes/vote');
var reserve = require('./routes/reserve');
var table = require("./routes/table");
var subjects = require('./routes/subjects')

//Momentjs Config
moment().format();
moment.locale();
const time = moment().startOf('hour').fromNow(); 

//Mongoose Config
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://mourad132:Momo2005@cluster0.csu9b.mongodb.net/Database?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true})

// Passport Config
require('./config/passport')(passport);

//app Config
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.set("view engine", "ejs");
app.use(methodOverride("_method"))
app.locals.moment = require("moment");

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// --------------
// *** routes ***
// --------------


// Users routes
app.use('/users', users);
app.use('/comment', comments);
app.use('/delete', deleteRoute);
app.use('/edit', edit);
app.use('/event', event);
app.use('/files', files);
app.use('/home', home);
app.use('/image', image);
app.use('/new', newRoute);
app.use('/profiles', profile);
app.use('/reservers', reservers);
app.use('/voters', voters);
app.use('/vote', vote);
app.use('/reserve', reserve);
app.use('/table', table);
app.use('/subjects', subjects)

// Landing Page
app.get('/', (req, res) => {
	//renders the landing page and sends current user along
	res.render('beta', {page: "Landing", user: req.user})
})

//My Profile Page
app.get('/profile', ensureAuthenticated, (req, res) => {
	res.render("myProfile.ejs", {user: req.user})
});

//PROFILE PHOTO

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: 'mongodb+srv://mourad132:Momo2005@cluster0.csu9b.mongodb.net/Database?retryWrites=true&w=majority',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

// User Uploading app
app.post('/', ensureAuthenticated, upload.single('file'), (req, res) => {
	//check if there is a file
	if(req.file){
	//find current user by id
	User.findById(req.user, (err, found) => {
		if(err){
			console.log(err)
		} else {
			//update the current photo
			found.photo = req.file.filename;
			//save it
			found.save()
			//redirect the user to his/her profile
			res.redirect('/profile/' + req.user._id)
		}
	})
	} else {
		//send a return back link
		res.send("Please Enter An Image <a href='/profile'>Return Back</a>")
	}
});


app.get("/:type/image/:id", ensureAuthenticated, (req, res) => {
	res.render("image", {type: req.params.type, id: req.params.id})
})

//Photo Uploading Route
app.post('/:type/image/:id', ensureAuthenticated, upload.single('file'), (req, res) => {
	//check if there is a file
	if(req.file){
	//check the post type from parameters
	if(req.params.type == "suggestion"){
		//find this post
	Suggestion.findById(req.params.id, (err, found) => {
		if(err){
			console.log(err)
		} else {
			//update the new file
			found.image = req.file.filename;
			//save it
			found.save()
			//redirect to the user profile
			res.redirect('/home/')
		}
	})
	} else if(req.params.type == "complain"){
	Complain.findById(req.params.id, (err, found) => {
		if(err){
			console.log(err)
		} else {
			found.image = req.file.filename;
			found.save()
			//redirect to the user profile
			res.redirect('/home/')
		}
	})
	} else if(req.params.type == "service"){
	Service.findById(req.params.id, (err, found) => {
		if(err){
			console.log(err)
		} else {
			found.image = req.file.filename;
			found.save()
			//redirect to the user profile
			res.redirect('/home/')
		}
	})
	} else if(req.params.type == "event"){
	Event.findById(req.params.id, (err, found) => {
		if(err){
			console.log(err)
		} else {
			found.image = req.file.filename;
			found.save()
			//redirect to the user profile
			res.redirect('/home/')
		}
	})
	} else if(req.params.type == "post"){
	Post.findById(req.params.id, (err, found) => {
		if(err){
			console.log(err)
		} else {
			found.image = req.file.filename;
			found.save()
			//redirect to the user profile
			res.redirect('/home/')
		}
	})
	} else {
		res.sendStatus(400)
	}
	} else {
		//send a return back link
		res.send("Please Enter An Image <a href='/photo'>Return Back</a>")
	}
});

//Search Route
app.get("/search", (req, res) => {
	res.render("search", {page: "Search"}) 
})

//Storage Route
app.get("/storage", (req, res) => {
	storage.find({}, (err, found) => {
		if(err){
			console.log(err)
		} else {
			//send found data
			res.json(found)
		}
	})
})

//Photo Route
app.get("/photo", ensureAuthenticated, function(req, res){
	res.render("photo")
})

//Fault Requests Handler
app.get("*", (req, res) => {
	res.send('<h1>404 Not Found</h1><a href="/home">Go Back</a>')
})

//Escape Regex Function
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//SERVER LISTENER
app.listen(process.env.PORT || 80, function(){
    console.log('server started')
})
