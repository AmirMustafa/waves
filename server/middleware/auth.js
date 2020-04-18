// Checks whether you are authenticated or not
const { User } = require("../models/user");

let auth = (req, res, next) => {
  let token = req.cookies.w_auth;

  // custom method
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });

    req.token = token; // if validation pass, append token in request
    req.user = user;
    next();
  });
};

module.exports = { auth };
