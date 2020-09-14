var express = require("express");

var router = express.Router();

var orm = require("../orm/orm");

router.get("/api/hello", async (req, res, next) => {
  try {
    let data = await orm.test()
    res.json(data)
  } catch (err) {
    res.sendStatus(500)
  }
})

router.get("/api/all/:table", async (req, res, next) => {
  try {
    let data = await orm.all(req.params.table)
    res.json(data)
  } catch (err) {
    res.sendStatus(500)
  }
})

router.get("/api/delete/:table/:id", async (req, res, next) => {
  try {
    await orm.delete(req.params.table, req.params.id)
    let data = await orm.all(req.params.table)
    res.json(data)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }

})

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