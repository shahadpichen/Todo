const pool = require("../db");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const CLIENT_ID = "Ov23ctMls3JjNcsTNDjv";
const CLIENT_SECRET = "3550d86006a22b39f14e2e8bb597374d4232a742";

const getToken = async function (req, res) {
  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;

  const age = 1000 * 60 * 60 * 24 * 7;

  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
};

const getUser = async function (req, res) {
  req.get("Authorization");
  let node_id;
  let name;
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then(async (data) => {
      node_id = data.node_id;
      console.log(data);
      name = data.name;
      const user = await pool.query(
        "SELECT * FROM oauthUser WHERE node_id = $1",
        [node_id]
      );

      if (user.rowCount === 0 && node_id) {
        await pool.query(
          "INSERT INTO oauthUser (node_id, user_name) VALUES ($1,$2) RETURNING *",
          [node_id, name]
        );
      }
      res.json(data);
    });
};

const getAllTodos = async (req, res) => {
  try {
    const listOfTodos = await pool.query(
      "SELECT * FROM oauthTodo where node_id = $1",
      [req.user.node_id]
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
      "INSERT INTO oauthTodo (description,node_id,due) VALUES ($1,$2,$3) RETURNING *",
      [description, req.user.node_id, due]
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
      "DELETE FROM oauthTodo WHERE tid = $1 AND node_id = $2 RETURNING *",
      [tid, req.user.node_id]
    );
    res
      .status(201)
      .json({ deleteTodo: deleteTodo.rows, message: "Deleted Successfully!!" });
  } catch (err) {
    res.status(400).json({ message: "Bad Request" });
  }
};

module.exports = { getToken, getUser, getAllTodos, addTodo, deleteTodo };
