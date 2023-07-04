//establish a connection to the database
let mysql = require("mysql");

//creating pool with credentials from environment
let pool = mysql.createPool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

//eports connection pool
module.exports = pool;