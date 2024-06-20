const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const getUsers = await pool.query("Select * from users");

    res.status(200).json(getUsers.rows);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

    if (!user_name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (user_name, email, password) VALUES ($1,$2,$3) RETURNING *",
      [user_name, email, hasedPassword]
    );
    const age = 1000 * 60 * 60 * 24 * 7;

    if (newUser && (await bcrypt.compare(password, newUser.rows[0].password))) {
      const accessToken = jwt.sign(
        {
          user_name: newUser.rows[0].user_name,
          email: newUser.rows[0].email,
          id: newUser.rows[0].user_id,
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: age }
      );

      res
        .cookie("token", accessToken, {
          httpOnly: true,
          // secure: true,
          maxAge: age,
        })
        .status(201)
        .json(accessToken);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const age = 1000 * 60 * 60 * 24 * 7;

    if (user && (await bcrypt.compare(password, user.rows[0].password))) {
      const accessToken = jwt.sign(
        {
          user_name: user.rows[0].user_name,
          email: user.rows[0].email,
          id: user.rows[0].user_id,
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: age }
      );

      res
        .cookie("token", accessToken, {
          httpOnly: true,
          // secure: true,
          maxAge: age,
        })
        .status(200)
        .json({ accessToken });
    } else {
      res.status(401).json({ message: "Email or password is not valid" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful!" });
};

module.exports = { register, getUsers, login, logout };
