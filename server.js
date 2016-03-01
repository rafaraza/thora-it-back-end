// Dependencies
var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var configDB = require('./config/database');

// Mongo DB

mongoose.connect(configDB.url);
require('./config/passport')(passport);

// Expresss
var app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
//app.use(bodyParser.json());
app.use(session({secret: 'thora-it-back-end-secret-seed',
                 saveUninitialized: true,
                 resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
//app.use('/api', require('./routes/api'));
require('./routes/api')(app, passport);

// Start server
var port = process.env.PORT | 8100;
app.listen(port);
console.log('thora-it back-end working on port: ' + port);
