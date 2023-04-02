const mongoose = require('mongoose');
const tweets = mongoose.model('tweets');
const notifications = mongoose.model('Notifications');

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
            user.like.Username.push(username);
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
                user.Comments.Username.push(username);
                user.Comments.Content.push(content);
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

module.exports.notification = async(req,res) =>{
    let Username = req.body.Username; //username of user whose tweet you liked
    let premessage = res.locals.user;
    await notifications.findOne({Username: Username}).exec(async (err,user)=>{
        if(err)
        {
           res
           .status(400)
           .json({"message":err});

        }
        else
        {
            if(user == null)
            {
                console.log("user is null");
                await notifications
                .create({
                    Username: Username,
                    details: premessage +req.body.details
                },(err,data)=>{
                    if(err)
                    {
                        res
                        .status(400)
                        .json({"message":"user not found and not able to create new"});
                    }
                    else
                    {
                        res
                        .status(200)
                        .json({"message":"new user created."});
                    }
                });
            }
            else
            {
                console.log("user found and notification pushed.");
                let newdetails =premessage +req.body.details;
                user.details.push(newdetails);
                await user.save((err)=>{
                    if(err) console.log(err);
                    else 
                    {
                        res
                        .json({"message" : "user was found and new detail added."});
                    }
                });
            }
        }
    });
};

module.exports.shownotif = async (req,res) =>
{
    let local_user = res.locals.user; 
    await notifications.findOne({Username: local_user}).exec(async (err,user)=>{
        if(err)
        {
            res
            .status(400)
            .json({"message":err});
        }
        else
        {
            // if(user.length == undefined)
            // {
                // await notifications
                // .create({
                //     Username: local_user
                // },(err,user)=>{
                //     if(err)
                //     {
                //         console.log("404!!")
                //         res
                //         .status(400)
                //         .json({"message":"user was not found and not able to create new"});
                //     }
                //     else
                //     {
                //         res
                //         .status(200)
                //         .json({"message":"new user created."});
                //     }
                // });
            // }
            // else
            // {
               res
                 .status(200)
                 .json({user});
            // }
        }
    })
}

module.exports.updateNoti = async (req,res) =>
{
    let current_no = parseInt(req.body.current_no);
    await notifications.findOne({Username: res.locals.user}).exec(async (err,user)=>{
        if(err)
        {
            res
            .status(400)
            .json({"message":"user was not found."});
        }
        else
        {
            user.Noti_count = current_no;
            await user.save((err)=>{
                if(err) console.log(err);
                else 
                {
                    res
                    .json({"message" : "noti count updated"});
                }
            });
        }
    });
};

module.exports.update = async(req,res)=>{
    const date = new Date();
    console.log(date);
};