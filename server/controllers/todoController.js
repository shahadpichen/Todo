const pool = require("../db");

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
    const { description } = req.body;
    const addTodo = await pool.query(
      "INSERT INTO todo (description,user_id) VALUES ($1,$2) RETURNING *",
      [description, req.user.id]
    );
    res.status(201).json(addTodo.rows);
  } catch (err) {
    res.status(400).json({ message: "Bad Request" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const tid = req.params.id;
    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE tid = $1 AND user_id = $2",
      [tid, req.user.id]
    );
    res.status(201).json({ message: "Deleted Successfully!!" });
  } catch (err) {
    res.status(400).json({ message: "Bad Request" });
  }
};

module.exports = {
  getAllTodos,
  addTodo,
  deleteTodo,
};
