const Pool = require("pg").Pool;

const pool = new Pool({
  username: "postgres",
  password: "postgres",
  database: "movies_database",
  host: "localhost",
  dialect: "postgres",
  port: 5432
});

module.exports = pool;
