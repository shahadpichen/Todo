const express = require("express");
const {
  getToken,
  getUser,
  getAllTodos,
  addTodo,
  deleteTodo,
} = require("../controllers/oauthController");

const router = express.Router();
const validateOauth = require("../middleware/verifyOauth.js");

router.get("/getAccessToken", getToken);
router.get("/getUserData", getUser);
router.get("/", validateOauth, getAllTodos);
router.post("/", validateOauth, addTodo);
router.delete("/:id", validateOauth, deleteTodo);

module.exports = router;
