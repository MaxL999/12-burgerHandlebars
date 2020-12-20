// Set up MySQL connection.
var mysql = require("mysql");

var fs = require('fs');
var sqlSeeds = fs.readFileSync("./schema/reset.sql").toString();

// i want to make an if statement for localhost or herokuapp
// so i dont have to comment code in and out constantly when debugging

// localhost testing
// var connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "root",
//   database: "burger_db",
// });

// allows multible calls in one click, its a security risk for DDos
// however, the only function that calls multiple time is the reset seeds function 
// multipleStatements: true
// process.env.JAWSDB_URL.multipleStatements = true;

// heroku deploy
var connection = mysql.createConnection(process.env.JAWSDB_URL);

// Make connection.
connection.connect((err) => {
  if (err) return console.log(err);
});

// export for MYSQL ORM
module.exports = connection;