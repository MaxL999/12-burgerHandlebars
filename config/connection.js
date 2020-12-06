// Set up MySQL connection.
var mysql = require("mysql");

// localhost testing
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "burger_db",
  // allows multible calls in one click, its a security risk for DDos
  // however, the only function that calls multiple time is the reset seeds function 
  multipleStatements: true
});
// heroku deploy
// var connection = mysql.createConnection(process.env.JAWSDB_URL);


// Make connection.
connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// export for MYSQL ORM
module.exports = connection;