const mongoose = require('mongoose');
const tweets = mongoose.model('tweets');
const cron = require('node-cron');

module.exports.Addtweet = async (req,res) =>{
    var user = res.locals.user;
    await tweets
        .create({
            Username : user,
            Content : req.body.Content
        },(err,data)=>{
            if(err)
            {
                res.status(400).json({err});
            }
            else
            {
                res.status(200).json({"message":"tweet done."});
            }
        })
};

module.exports.Like = async(req,res)=>{
var reciever = req.body.reciever; //user whose tweet is liked
var tweetno = req.body.tweetno; //his tweet no
var username = res.locals.user;
await tweets
    .findOne({Username: reciever, TweetNo: tweetno},async(err,user)=>{ //findOne returns a single document, find returns cursor
        if(err){
            res
            .status(400).json({err});
        }
        else{
            user.like.LikeCounter +=1;
            user.like.Username = username;
            await user.save((err)=>{
                if(err) console.log(err);
                else 
                {
                    res.json({"message" : "like done."});
                }
            });
        }
    });
};

module.exports.Comment = async(req,res)=>{
    var reciever = req.body.reciever; //user whose tweet is liked
    var tweetno = req.body.tweetno; //his tweet no
    var username = res.locals.user; //who is liking the tweet
    var content = req.body.content;
    await tweets
        .findOne({Username: reciever, TweetNo: tweetno},async(err,user)=>{ //findOne returns a single document, find returns cursor
            if(err){
                res
                .status(400).json({err});
            }
            else{
                user.Comments.CommentCounter +=1;
                user.Comments.Username = username;
                user.Comments.Content = content;
                await user.save((err)=>{
                    if(err) console.log(err);
                    else 
                    {
                        res.json({"message" : "comment done."});
                    }
                });
            }
        });
};

module.exports.show = async(req,res) =>{
    await tweets.find().exec((err,data)=>{
        if(err)
        {
            res
            .status(400)
            .json({err});
        }
        res
        .status(200)
        .json({data});
    });
};

module.exports.update = async(req,res)=>{
    var count, i=0;
    var loggedin_user = res.locals.user;
    await tweets.find({Username: loggedin_user},async (err,data)=>{
        if(data)
        {
            count = data.length;
        }
    });
    cron.schedule("* * * * * *", async()=>{
        await tweets.find({Username: loggedin_user},(err,data)=>{
            if(data)
            {
                console.log("working"+ i);
                i++;
                if(data.length>count)
                {
                    count = data.length; 
                    // console.log(data);                   
                    return JSON.stringify(data[count]);
                }
            }
        });
    })
};