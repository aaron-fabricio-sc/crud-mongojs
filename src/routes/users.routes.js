const { Router } = require("express");

const router = Router();
const {
  renderSingUpForm,
  renderSingInForm,
  singIn,
  singup,
  logOut,
} = require("../controllers/users.controller");

router.get("/users/singup", renderSingUpForm);
router.post("/users/singup", singup);

router.get("/users/singin", renderSingInForm);
router.post("/users/singin", singIn);

router.get("/users/logout", logOut);
module.exports = router;
