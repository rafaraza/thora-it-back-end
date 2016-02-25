// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Mongo DB
mongoose.connect('mongodb://localhost/thora-it');

// Expresss
var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes/api'));

// Start server
var port = 8100;
app.listen(port);
console.log('thora-it back-end working on port: ' + port);
