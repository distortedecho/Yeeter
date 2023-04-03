const mongoose = require('mongoose');
const tweets = mongoose.model('tweets');
const offload = require('../offloader/offloader');

function getHashTags(){
    //TODO 
    //Get data from tweets and collect hashtags
    let arr;
    tweets.find({},{ _id: 0, Content: 1 }).exec(async(err,user)=>{
        if(user){
            arr = user;
            // console.log(user);

            console.log(arr.length+" length!");
            offload.Analyser(user);
        }
        else{
            console.log(err+"ee");
        }
    })
    //store data
    //offload to service to get maxheap
}

module.exports = getHashTags;