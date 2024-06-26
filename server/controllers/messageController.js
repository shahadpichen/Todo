const pool = require("../db");

const addMessage = async (req, res) => {
  try {
    const { chat_id, message } = req.body;
    console.log(chat_id, message, req.user.id);
    const addMessage = await pool.query(
      "INSERT INTO message (chat_id, user_id, message) VALUES ($1, $2, $3) RETURNING *",
      [chat_id, req.user.id, message]
    );
    res.status(200).json(addMessage.rows);
  } catch (err) {
    res.status(400).json({ message: "Bad Request" });
  }
};

module.exports = { addMessage };
