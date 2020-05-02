// Set up MySQL connection.
var mysql = require("mysql");
var env = process.env.NODE_ENV || "development";
var config = require("./config.json")[env];

var connectionObject = {};

console.log(config)
if (config.use_env_variable) {
  console.log("production")
  connectionObject = config.production
} else {
  console.log("developement")
  connectionObject = config.development
}

var connection = mysql.createConnection(connectionObject);

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
