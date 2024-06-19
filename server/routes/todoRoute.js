const express = require("express");
const {
  getAllTodos,
  addTodo,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

const verityToken = require("../middleware/verifyToken");

router.get("/", verityToken, getAllTodos);
router.post("/", verityToken, addTodo);
router.delete("/:id", verityToken, deleteTodo);

module.exports = router;
