var mongoose = require('mongoose');
const uri = "mongodb+srv://aditya_:dilERxIarDytmeIy@cluster0-jcswr.mongodb.net/test?retryWrites=true&w=majority";

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


require('./user-info.js');
require('./tweets');
require('./notification');