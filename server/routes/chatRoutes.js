const express = require("express");
const {
  getUsers,
  addChatList,
  chatListUsers,
  getChat,
  addChat,
  readChat,
} = require("../controllers/chatController");

const router = express.Router();

const verityToken = require("../middleware/verifyToken");

router.get("/", verityToken, getUsers);
router.post("/addChatList", verityToken, addChatList);
router.get("/chatListUsers", verityToken, chatListUsers);

router.get("/:id", verityToken, getChat);
router.post("/", verityToken, addChat);
router.post("/read/:id", verityToken, readChat);

module.exports = router;
