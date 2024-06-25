const express = require("express");
const {
  getChats,
  getChat,
  addChat,
  readChat,
} = require("../controllers/todoController");

const router = express.Router();

const verityToken = require("../middleware/verifyToken");

router.get("/", verityToken, getChats);
router.get("/:id", verityToken, getChat);
router.post("/", verityToken, addChat);
router.post("/read/:id", verityToken, readChat);

module.exports = router;
