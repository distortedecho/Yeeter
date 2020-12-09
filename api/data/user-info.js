var mongoose = require('mongoose');
var validator = require('mongoose-unique-validator');
const moment = require('moment-timezone');
const DelhiTime = moment.tz(Date.now(), "Asia/Kolkata");

var signupModel = new mongoose.Schema({
	
	FirstName :
	{
		 type : String,
		 min :3,
		 max :30,
		 required : true
	},
	LastName :
	{
		type: String,
		min :3,
		max :30
	},
	Date : 
	{
	 type: Date,
	 default : DelhiTime
	},
	Username :
	{
		type: String,
		min :3,
		max: 20,
		required: true,
		unique: true,
		uniqueCaseInsensitive: true
	},
	Password :
	{
		type: String,
		min:5,
		required: true
	}
});

signupModel.plugin(validator);
mongoose.model('Signup', signupModel ,'twitter-user');