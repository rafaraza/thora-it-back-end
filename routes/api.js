// // Dependencies
// var express = require('express');
// var router = express.Router();
//
// // Controllers
// var userCtrl = require('../controllers/userCtrl');
//
// // Models
// //var Product = require('../models/product');
// var User = require('../models/user');
//
// // Routes
// //Product.methods(['get', 'post', 'put', 'delete']);
// //Product.register(router, '/products');
//
// // router.get('/products', function(req, res) {
// //   res.send('Api is working');
// // });
//
// router.post('/signup', userCtrl.save);
//
//
// // Facebook
// // Redirect the user to Facebook for authentication.  When complete,
// // Facebook will redirect the user back to the application at
// //     /auth/facebook/callback
// // app.get('/auth/facebook', passport.authenticate('facebook'));
//
// // Facebook will redirect the user to this URL after approval.  Finish the
// // authentication process by attempting to obtain an access token.  If
// // access was granted, the user will be logged in.  Otherwise,
// // authentication has failed.
// // app.get('/auth/facebook/callback',
// // passport.authenticate('facebook', { successRedirect: '/',
// //                                      failureRedirect: '/login' }));
//
// module.exports = router;
//
// ///////////////////////////////////////////////////

//Models
var User = require('../models/user');

// Controllers
var userCtrl = require('../controllers/userCtrl');

module.exports = function(app, passport) {
  app.get('/api', function(req, res) {
    res.send('thora-it-back-and');
  });

  app.get('/api/profile', isLoggedIn, function(req, res) {
    res.status(200).json(req.user);
  });

  app.get('/api/logout', function(req, res) {
    req.logout();
    res.redirect('/api');
  });

  app.get('/api/signup/fail', function(req, res) {
    res.status(400).json({});
  });

  app.get('/api/signup/success', function(req, res) {
    res.status(200).json({});
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));
}

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/api');
}
