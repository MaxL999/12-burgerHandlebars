// Set up MySQL connection.
var mysql = require("mysql");

var fs = require('fs');
var sqlSeeds = fs.readFileSync("./schema/reset.sql").toString();

// i want to make an if statement for localhost or herokuapp
// so i dont have to comment code in and out constantly when debugging
// console.log("testing")
// console.log(process.env.NODE_ENV)
// console.log(process)
// if (process.env.JAWSDB_URL) {
//   process.env.JAWSDB_URL.multipleStatements = true;
//   var connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//   var connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "root",
//     database: "burger_db",
//     // allows multible calls in one click, its a security risk for DDos
//     // however, the only function that calls multiple time is the reset seeds function 
//     multipleStatements: true
//   });
// }

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

  // connection.query(sqlSeeds, (err, results, fields) => {
  //   if (err) return console.log(err);
  //   console.log("table insert")
  // });

  // var searchString = "SELECT * FROM burger;"
  // connection.query(searchString, (err, results, fields) => {
  //   if (err) return console.log(err);
  //   console.log("call sucess")
  //   console.log(results)

  // });


});

// export for MYSQL ORM
module.exports = connection;