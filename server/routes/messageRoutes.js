const express = require("express");
const { addMessage } = require("../controllers/messageController");

const router = express.Router();

const verityToken = require("../middleware/verifyToken");

router.post("/", verityToken, addMessage);

module.exports = router;
