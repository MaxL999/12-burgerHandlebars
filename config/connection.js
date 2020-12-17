// Set up MySQL connection.
var mysql = require("mysql");

var orm = require("../orm/orm")

// localhost testing
// var connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "root",
//   database: "burger_db",
//   // allows multible calls in one click, its a security risk for DDos
//   // however, the only function that calls multiple time is the reset seeds function 
//   multipleStatements: true
// });

// heroku deploy
process.env.JAWSDB_URL.multipleStatements = true;
var connection = mysql.createConnection(process.env.JAWSDB_URL);

// Make connection.
connection.connect((err) => {
  if (err) return console.error("error connecting: " + err.stack);
  console.log("connected as id " + connection.threadId);

  var returnVal = orm.restore()
  console.log(returnVal)
});

// export for MYSQL ORM
module.exports = connection;