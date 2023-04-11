const mongoose = require('mongoose');
const signup = mongoose.model('Signup');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

module.exports.user = async(req,res)=>{
  const Password = req.body.Password;
	await	signup
		.create({
			FirstName : req.body.FirstName,
			LastName : req.body.LastName,
			Username : req.body.Username,
			Password : bcrypt.hashSync(Password,bcrypt.genSaltSync(10))
			}, (err, data)=>{
                    if(err)
                    {
                        res
                        .status(400)
                        .json(err);
                        console.log(err);
                    }else
                    {
                        res
                        .status(200)
                        .json({
                            "message" : "User created"
                        });
                    }
            })
};

module.exports.login = async(req,res) =>{
    var Username = req.body.Username;
    var Password = req.body.Password;

    await signup.findOne({
      Username: Username})
        .exec(function(err, signup)
    {
      if (err) 
      {
        res
        .status(400)
        .json(err);
      } 
      else 
      {
            if (bcrypt.compareSync(Password, signup.Password)) 
                {
                  var token = jwt.sign({ Username: signup.Username }, 's3cr3t', { expiresIn: 3600 });
                  res.status(200).json({message: "user found", token: token}); 
                }
             else 
                {
                    res
                    .status(401)
                    .json('Unauthorized');
                }
      }
    });
};

module.exports.authorize = (req, res, next) =>
{
 	var headerExists = req.headers.authorization;
  	  if (headerExists) 
  	  {
    	var token = req.headers.authorization.split(' ')[1];  //--> Authorization Bearer xxx
      jwt.verify(token, 's3cr3t', (error, decoded)=> 
    	{
      		if (error) 
      		{
          res
          .status(401)
          .json('Unauthorized');  //401 for not authenticated
          console.log(error);
      		}
      		else 
      		{
        	res.locals.user = decoded.Username;
          next();
      		}
    	});
  	  } 
      else 
      {
      res
      .status(403)
      .json('No token provided'); //403 for not authorized/ forbidden
      }
};