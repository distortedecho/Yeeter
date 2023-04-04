const mongoose = require('mongoose');
const hashTags = mongoose.model('cronModel');

//add hashTags with count to DB
module.exports.insertHashTags = async(req,res)=>{
    let dataString = req;
    await hashTags.findOne({hashTag:dataString},async(err,user)=>{
        if(err)
        {   
            res
            .status(400).json({err});
        }
        else
        {
            if(user==null)
            {
                hashTags.create({
                    hashTag : dataString,
                    value : 1
                },(err,data)=>{
                    if(err)
                    {
                        res
                        .status(400).json({err});
                    }
                    else
                    {
                        console.log("new hashtag added!")
                    }
                })
            }
            else
            {
                user.value = user.value+1;
                await user.save((err,user)=>{                  
                    console.log(user+" user!");                  
                });
            }
        }
    })
}

module.exports.getTopTags = async(req,res)=>{
    await hashTags.find({}, {}, { sort: { "value": -1 }, limit: 1 },(err,user)=>{
        if(err) console.log(err);
        if(user) console.log(user+" Highest rated tag!");
    })
}
