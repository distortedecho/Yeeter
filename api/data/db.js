const mongoose = require('mongoose');
require('./user-info.js');
require('./tweets');
require('./notification');
require('./hashTags.js');
const mongo_url = require('../../config/keys.js');

const uri = mongo_url;

	//connecting mongoose to atlas
	//unhandled promises are being depricated
	//these promises will later kill the application with return 0 or 1
	 mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true,})
	 .catch(err => console.log(err));
	
	mongoose.connection.on('connected',()=>
	{
		console.log('Mongoose connected.');
	});
	mongoose.connection.on('disconnected',()=>
	{
	console.log('Mongoose disconnected');
	});

	mongoose.connection.on ('error', (err)=>
	{
	console.log('Mongoose error'+err);
	});
