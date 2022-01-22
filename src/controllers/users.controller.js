const usersCtrl = {};
const User = require("../models/User");
const passport = require("passport");
usersCtrl.renderSingUpForm = (req, res) => {
  res.render("users/singUp");
};
usersCtrl.singup = async (req, res) => {
  const errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Las contraseñas no coinciden" });
  }
  if (password.length < 4) {
    errors.push({ text: "La contraseña debe tener de 4 caracteres" });
  }
  if (errors.length > 0) {
    res.render("users/singUp", { errors, name, email });
  } else {
    const emailUser = await User.findOne({ email: email });

    if (emailUser) {
      req.flash("error_msg", "El email ya existe");
      res.redirect("/users/singup");
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Creado exitosamente");
      res.redirect("/users/singin");
    }
  }
};

usersCtrl.renderSingInForm = (req, res) => {
  res.render("users/singIn");
};
usersCtrl.singIn = passport.authenticate("local", {
  failureRedirect: "/users/singin",
  successRedirect: "/notes",
  failureFlash: true,
});

usersCtrl.logOut = (req, res) => {
  req.logOut();
  req.flash("success_msg", "successful exit");
  res.redirect("/users/singin");
};

module.exports = usersCtrl;
