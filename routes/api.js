// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Product = require('../models/product');

// Routes
Product.methods(['get', 'post', 'put', 'delete']);
Product.register(router, '/products');

// router.get('/products', function(req, res) {
//   res.send('Api is working');
// });


// Facebook
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
// app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
// app.get('/auth/facebook/callback',
// passport.authenticate('facebook', { successRedirect: '/',
//                                      failureRedirect: '/login' }));

module.exports = router;
