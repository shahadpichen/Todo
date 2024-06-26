const pool = require("../db");

const getUsers = async (req, res) => {
  try {
    const getUser = await pool.query("SELECT * FROM users");
    res.status(200).json(getUser.rows);
  } catch (error) {}
};

const addChatList = async (req, res) => {
  try {
    const { user_name, user_id } = req.body;
    console.log(user_name, user_id);
    const addChatList = await pool.query(
      "INSERT INTO chatList (user_name,user_id) VALUES ($1,$2) RETURNING *",
      [user_name, user_id]
    );
    res.status(200).json(addChatList.rows);
  } catch (error) {}
};

const chatListUsers = async (req, res) => {
  try {
    const chatList = await pool.query("SELECT * FROM chatList");
    res.status(200).json(chatList.rows);
  } catch (error) {}
};

const getChat = async (req, res) => {
  try {
  } catch (error) {}
};

const addChat = async (req, res) => {
  try {
  } catch (error) {}
};

const readChat = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  getUsers,
  addChatList,
  chatListUsers,
  getChat,
  addChat,
  readChat,
};
