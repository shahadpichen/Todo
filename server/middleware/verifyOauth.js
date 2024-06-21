const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const validateOauth = async (req, res, next) => {
  try {
    let authToken = req.headers.Authorization || req.headers.authorization;

    if (authToken && authToken.startsWith("Bearer")) {
      await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then(async (data) => {
          req.user = data;
          next();
        });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = validateOauth;
