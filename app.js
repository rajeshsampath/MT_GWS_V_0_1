const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('config');
const db = require('./config/db');

//Set global app root path
global._rootPath = path.resolve(__dirname);

// Set Global app root path 
global.G_MODEL_PATH = path.join(__dirname, 'model');

global.rootRequire = function(name){
  return require(__dirname + '/' + name);
}

global._Helper = require('./lib/Helper');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

app.use(logger('dev'));
//request entity too large fix
app.use(bodyParser.json({
	limit: '50mb'
}));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(customBodyParser);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Load the route index
const routes = require('./routes/index');

//Initiallize Route
routes.initialize(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	console.log('err.message',err.message)
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


/**
 *@description For parsing XML request
 *@author Fahid Mohammad
 *@date 20-07-2017
 */
function customBodyParser(req, res, next) {
	let contype = req.headers['content-type'];
	req.xmlBody = '';
	if (contype === 'application/xml' || contype === 'text/xml') {
		let data = '';
		req.setEncoding('utf8');
		req.on('data', function(chunk) {
			data += chunk;
		});
		req.on('end', function() {
			req.xmlBody = data;
			next();
		});
	} else {
		next();
	}
}

module.exports = app;