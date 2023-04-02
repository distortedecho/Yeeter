require('./api/data/db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./api/routes');
const cron = require("node-cron");
const controller = require('./api/controller/tweets-controller');

app.set('port_number',(process.env.PORT || 8080));
app.use(function(req,res,next){
	console.log(req.method,req.url);
	next();
});
//setting server at port 8080
var server = app.listen(app.get('port_number'), ()=>{
var port = server.address().port;
console.log("Server is up and running at "+port+" port.");
});

//requests made by the client
app.use((req,res,next)=>{
    console.log(req.method, req.url);
    next();
});

cron.schedule("*/3 * * * * *", function(){
    controller.update();
});

//let the server parse json data
app.use(bodyParser.json());
//let the server parse nested data 
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next) {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
if (req.method == "OPTIONS")
{
   res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
   return res.status(200).json({});
}
next();
});

app.use('/twitter',routes);