// Dependencies
var express     = require('express');
var session     = require('express-session');
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var config      = require('./config/database');
var jwt         = require('jwt-simple');
var passport	  = require('passport');
var port        = process.env.PORT | 8100;

// Mongo DB
mongoose.connect(config.url);

// Expresss
var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Log to console
app.use(morgan('dev'));

require('./config/passport')(passport);

// Use the passport package in our application
app.use(passport.initialize());

// Routes
app.use('/api/user', require('./routes/api/user')(app, express, passport));

// Start server
app.listen(port);
console.log('thora-it back-end working on port: ' + port);
