// Dependencies
var express = require('express');
var router = express.Router();

// Controllers
var userCtrl = require('../../controllers/userCtrl');

// Models
var User = require('../../models/user');

// Routes
router.post('/', userCtrl.post);

module.exports = router;
