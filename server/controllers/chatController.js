const pool = require("../db");

const getUsers = async (req, res) => {
  try {
    const getUser = await pool.query("SELECT * FROM users");
    res.status(200).json(getUser.rows);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

const addChatList = async (req, res) => {
  try {
    const { user_name, user_id } = req.body;
    const addChatList = await pool.query(
      "INSERT INTO chatList (user_name,user_id,owner_id,owner_name) VALUES ($1,$2,$3,$4) RETURNING *",
      [user_name, user_id, req.params.id, req.params.name]
    );

    res.status(200).json(addChatList.rows);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

const chatListUsers = async (req, res) => {
  try {
    const chatList = await pool.query(
      "SELECT * FROM chatList where owner_id = $1 OR user_id = $1",
      [req.params.id]
    );
    res.status(200).json(chatList.rows);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

const getChat = async (req, res) => {
  console.log(req.params.id);
  try {
    const getChat = await pool.query("SELECT * FROM chats where chat_id = $1", [
      req.params.id,
    ]);
    res.status(200).json(getChat.rows);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

const addChat = async (req, res) => {
  const { chat_id, user_id } = req.body;

  try {
    const existingChat = await pool.query(
      "SELECT * FROM chats WHERE chat_id = $1",
      [chat_id]
    );

    if (existingChat.rows.length > 0) {
      return res.status(400).json({ message: "Chat already exists" });
    }

    const addChatList = await pool.query(
      "INSERT INTO chats (chat_id, users) VALUES ($1, ARRAY[$2]) RETURNING *",
      [chat_id, req.user.id]
    );

    if (addChatList.rowCount > 0) {
      await pool.query(
        "UPDATE chats SET users = array_cat(users, ARRAY[$1]) WHERE chat_id = $2",
        [user_id, chat_id]
      );
    }

    res.status(200).json(addChatList.rows);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Bad Request" });
  }
};

const readChat = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
};

module.exports = {
  getUsers,
  addChatList,
  chatListUsers,
  getChat,
  addChat,
  readChat,
};
