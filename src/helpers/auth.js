const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "You do not have the entry permits");
  res.redirect("/users/singin");
};

module.exports = helpers;
