var express = require("express");

var router = express.Router();

var burger = require("../models/burger");

router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burger: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/food", function(req, res) {
  console.log(req.body)
  burger.create([
    "name", "eaten"
  ], [
    req.body.name, req.body.eaten
  ], function(result) {
    console.log("sucess")
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/food/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.update({
    eaten: req.body.eaten
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/food/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
