// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var path     = require('path');
var port     = process.env.PORT || 5000;
var passport = require('passport');

var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var session      = require('express-session');

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// send down static files
app.use(express.static(__dirname + '/public'));

// required for passport
app.use(session({ secret: 'teambreakthrough', resave: false, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes ======================================================================
require('./routes/routes.js')(app, path, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
