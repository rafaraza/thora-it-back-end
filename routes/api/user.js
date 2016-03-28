// Controllers
var userCtrl = require('../../controllers/userCtrl');

module.exports = function(app, express, passport) {
  var usersRouter = express.Router();

  // Routes
  usersRouter.post('/signup', userCtrl.signup);
  usersRouter.post('/authenticate', userCtrl.authenticate);
  usersRouter.get('', passport.authenticate('jwt', {session: false}), userCtrl.userInfo);

  return usersRouter;
};
