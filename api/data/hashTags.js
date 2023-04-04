var mongoose = require('mongoose');
var validator = require('mongoose-unique-validator');

var cronModel = new mongoose.Schema({
    hashTag : {type: String, unique: true},
    value   : {type:Number}
});

mongoose.model('cronModel', cronModel ,'cronModel');