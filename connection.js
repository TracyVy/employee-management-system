const mysql = require("mysql");

// Set up connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_db",
});

// Test connection
// connection.connect((err) => {
//   if (err) throw err;
//   console.log("We are connected to:", connection.threadId);
// });

module.exports = connection;
