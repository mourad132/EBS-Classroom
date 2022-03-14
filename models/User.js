const mongoose = require('mongoose');
const moment = require("moment")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
	type: String,
	required: false,
},
	notifications: [],
	histroy: [],
 number: {
	type: Number,
	required: false,
},
	photo: {
		type: String,
		required: false
	},
	username: {
		type: String,
		required: true,
	},
  date: {
	type: String,
	 dateNow: Date.now,
     Date: moment().startOf(this.dateNow).fromNow(),
  },
  type: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
