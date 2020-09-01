var express = require("express");

var router = express.Router();

var orm = require("../orm/orm");

router.get("/api/hello", (req, res, next) => {

  console.log("Call recieved")
  res.json("hello")
  console.log("response")

})

router.get("/api/test", async (req, res, next) => {

  console.log("Call recieved")

  try {
    let data = await orm.test();
    res.json(data)
  } catch(err){
    console.log(err)
    res.sendStatus(500)
  }

  console.log("response")

})

// router.route("/api/hello")
//   .get(res.json("HELLO!"))

// router.get("/api/food/", function(req, res) {
//   burger.all(function(data) {
//     // var hbsObject = { burger: data };
//     // console.log(hbsObject);
//     res.json(data);
//   });
// });

// router.post("/api/food", function(req, res) {
//   console.log(req.body)
//   burger.create([
//     "name", "eaten"
//   ], [
//     req.body.name, req.body.eaten
//   ], function(result) {
//     console.log("sucess")
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// });

// router.put("/api/food/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   burger.update({
//     eaten: req.body.eaten
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// router.delete("/api/food/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   burger.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

module.exports = router;