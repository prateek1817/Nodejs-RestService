var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost:27017/meanDB';

mongoose.connect(dbUrl);

// close the Mongoose connection on control + c

process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log("mongoose default connecion closed");
		process.exit(0);
	});
});


require('../models/employee');
require('../models/team');