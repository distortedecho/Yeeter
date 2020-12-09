var mongoose = require('mongoose');
var validator = require('mongoose-unique-validator');
const moment = require('moment-timezone');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const DelhiTime = moment.tz(Date.now(), "Asia/Kolkata");

var tweetModel = new mongoose.Schema({
    Username : {type: String, required: true},
    CreatedAt : {type: Date, default : DelhiTime, required: true},
    Content : {type:String, max:280, min:5, required:true},
    like :
        {
            'LikeCounter' : {type: Number, default: 0, required:true},
            'Username' : [String]
        },
    Comments :
        {
            'CommentCounter' : {type:Number, default: 0,required:true},
            'Username': [String],
            'Content' : [String]
        }
});
tweetModel.plugin(validator);
tweetModel.plugin(AutoIncrement, {inc_field: 'TweetNo'});
mongoose.model('tweets', tweetModel ,'Alltweets');