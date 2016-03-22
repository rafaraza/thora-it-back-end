var User = require('../models/user');

var user;

var userCtrl = {
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
}
module.exports = userCtrl;
