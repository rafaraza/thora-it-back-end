var jwt     = require('jwt-simple');
var User    = require('../models/user');
var config  = require('../config/database');
var user;

var userCtrl = {
  signup: function(req, res) {
    if (!req.body.local.email || !req.body.local.password) {
      res.json({success: false, msg: 'Please pass name and password.'});
    } else {
      var newUser = new User({
        local: {
          username: "",
          email: req.body.local.email,
          password: req.body.local.password
        },
        facebook: {},
        twitter: {},
        google: {}
      });

      newUser.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Username already exists. Error:'});
        }
        res.json({success: true, msg: 'Successful created new user.'});
      });
    }
  },

  authenticate: function(req, res) {
    User.findOne({
      "local.email": req.body.local.email
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.local.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.encode(user, config.secret);
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  },

  userInfo: function(req, res) {
    console.log("controller userInfo");
    var token = getToken(req.headers);
    if (token) {
      var decoded = jwt.decode(token, config.secret);
      User.findOne({
        "local.email": decoded.local.email
      }, function(err, user) {
          if (err) throw err;

          if (!user) {
            return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
          } else {
            res.json({"success": true, "user": user});
          }
      });
    } else {
      return res.status(403).send({success: false, msg: 'No token provided.'});
    }
  },

  post: function(req, res) {
    if (req.body == null || req.body == "" || req.body == {} || typeof(req.body) == 'undefined') {
      res.status(404).json({"error": "Bad Request: The request could not be understood by the server due to malformed syntax."});
    } else {
      res.status(200).json({Msg: "aaaaa"});
    }
  },

  login: function (req, res) {
    response = res;

    var requestUser = new User();
    requestUser.local.username = req.body.user.username;
    requestUser.local.password = req.body.user.password;

    findByLocalUsername.then(function(user){
      if (requestUser.validPassword(user.local.password)) {
        successCallback(user);
      } else {
        notFoundCallback({"Message": "Wrong password"});
      }
    }, errorCallback);
    User.create(user).then(successCallback, errorCallback);
  },

  save: function (req, res) {
    response = res;
    user = new User();
    user.local.username = req.body.user.username;
    user.local.password = user.generateHash(req.body.user.password);
    User.create(user).then(successCallback, errorCallback);
  },

  update: function (req, res) {
    response = res;
    user = new User();
    user.local.username = req.body.user.username;
    user.local.password = req.body.user.password;
    User.create(user).then(successCallback, errorCallback);
  },

  delete: function (req, res) {
    response = res;
    User.remove(req.body._id).then(successCallback, errorCallback);
  }
};

var findByLocalUsername = function(username) {
  var dbUser = User.findOne({"local.username": username}).exec();
}

var successCallback = function (result) {
  response.status(200).json(result);
};

var errorCallback = function (err) {
  response.status(500).json(err);
};

var notFoundCallback = function (err) {
  response.status(404).json(err);
};

var userNotFoundCallback = function () {
  response.status(401).json({});
};

var getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
module.exports = userCtrl;
