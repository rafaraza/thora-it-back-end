var User = require('../models/user');

var user;

var userCtrl = {
    save: function (req, res) {
      response = res;
      user = new User();
      user.local.username = req.body.user.username;
      user.local.password = req.body.user.password;
      User.create(user).then(successCallback, errorCallback);
    }
};

var successCallback = function (result) {
  response.status(200).json(result);
};

var errorCallback = function (err) {
  response.status(500).json(err);
};

module.exports = userCtrl;
