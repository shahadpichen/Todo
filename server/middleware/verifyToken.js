const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    let token;
    let authToken = req.headers.Authentication || req.headers.authentication;

    if (authToken && authToken.startsWith("Bearer")) {
      token = authToken.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
        if (err) {
          console.log(err);
        }

        req.user = decoded;
        next();

        if (!token) {
          res.status(400).json({ message: "No token" });
        }
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = validateToken;
