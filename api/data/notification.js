var mongoose = require('mongoose');
var validator = require('mongoose-unique-validator');

var notificationModel = new mongoose.Schema({
Username :
{
type: String,
min :3,
max: 20,
required: true,
unique: true,
uniqueCaseInsensitive: true
},
Noti_count : 
{
 type: Number,
 default: 0
},
details : [String]
});

notificationModel.plugin(validator);
mongoose.model('Notifications', notificationModel ,'notifications');