const mongoose = require('mongoose');
const tweets = mongoose.model('tweets');
const offload = require('../offloader/offloader');

function getHashTags(){
    //Get data from tweets and collect hashtags
    //store data
    let arr;
    tweets.find({},{ _id: 0, Content: 1 }).exec(async(err,user)=>{
        if(user){
            arr = user;
            console.log(arr.length+" length!");
            console.log(user);
            //offload to service to get maxheap
           await offload.Analyser(user);
        }
        else{
            console.log(err+"ee");
        }
    });
}

function getData(){
    offload.topHashTag();
}

module.exports = {
    getHashTags: getHashTags,
    getData: getData
};