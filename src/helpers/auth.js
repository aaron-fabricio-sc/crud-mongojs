const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "No tienes los permisos de ingreso");
  res.redirect("/users/singin");
};

module.exports = helpers;
