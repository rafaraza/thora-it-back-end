// Dependencies
var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var morgan = require('morgan');
var configDB = require('./config/database');

// Mongo DB
mongoose.connect(configDB.url);

// Expresss
var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Routes
app.use('/api/user', require('./routes/api/user'));

// Start server
var port = process.env.PORT | 8100;
app.listen(port);
console.log('thora-it back-end working on port: ' + port);
