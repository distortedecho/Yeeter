var mongoose = require('mongoose');
var validator = require('mongoose-unique-validator');

var cronModel = new mongoose.Schema({
    count_done : {type: Number, default: 0},
    hashTags : [String]
});

mongoose.model('cronModel', cronModel ,'cronModel');