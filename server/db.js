const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "qweasdzxc",
  host: "localhost",
  port: "5001",
  database: "todo",
});

module.exports = pool;
