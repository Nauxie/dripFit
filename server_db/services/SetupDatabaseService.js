let mongoose = require('mongoose');

module.exports = function() {
    let url = _db.get('db.connection.' + _env);
    console.info('Attempting to connect to ' + url);
    mongoose.connect(url);
    mongoose.connection.on('connected', function() {
	console.info('Database connection established');
    });

    mongoose.connection.on('error', function(err) {
	console.critical('Cannot connect to database');
	console.critical(JSON.stringify(err));
	return process.exit();
    });

    mongoose.connection.on('disconnected', function() {
	console.info('Database disconnected');
    });
}