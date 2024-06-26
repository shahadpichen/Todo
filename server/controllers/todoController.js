const pool = require("../db");

const getUser = async (req, res) => {
  try {
    const getUser = await pool.query(
      "SELECT user_name,user_id FROM users where user_id = $1",
      [req.user.id]
    );
    res.status(200).json(getUser.rows);
  } catch (err) {
    res.status(400).json({ message: "Bad Request" });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const listOfTodos = await pool.query(
      "SELECT * FROM todo where user_id = $1",
      [req.user.id]
    );
    res.status(200).json(listOfTodos.rows);
  } catch (err) {
    res.status(400).json({ message: "Bad Request" });
  }
};

const addTodo = async (req, res) => {
  try {
    const { description, due } = req.body;
    const addTodo = await pool.query(
      "INSERT INTO todo (description,user_id,due) VALUES ($1,$2,$3) RETURNING *",
      [description, req.user.id, due]
    );
    res
      .status(201)
      .json({ addedTodo: addTodo.rows, message: "Added Successfully!" });
  } catch (err) {
    res.status(400).json({ message: "Bad Request" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const tid = req.params.id;
    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE tid = $1 AND user_id = $2 RETURNING *",
      [tid, req.user.id]
    );
    res
      .status(201)
      .json({ deleteTodo: deleteTodo.rows, message: "Deleted Successfully!!" });
  } catch (err) {
    res.status(400).json({ message: "Bad Request" });
  }
};

module.exports = {
  getUser,
  getAllTodos,
  addTodo,
  deleteTodo,
};
