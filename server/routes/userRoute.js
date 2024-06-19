const express = require("express");
const {
  register,
  getUsers,
  login,
  logout,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.post("/", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
