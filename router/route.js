var router = require("express").Router();

var orm = require("../orm/orm");

// search all
router.get("/api/all/:table", async (req, res, next) => {
  try {
    var data = await orm.all(req.params.table)
    res.json(data)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// restore website data
router.post("/api/restore", async (req, res, next) => {
  try {
    var data = await orm.restore()
    res.json(data)
  } catch (err) {
    res.sendStatus(500)
  }
})

// delete item
router.delete("/api/:table/:id", async (req, res, next) => {
  try {
    var data = await orm.delete(req.params.table, req.params.id)
    res.json(data)
  } catch (err) {
    res.sendStatus(500)
  }
})

// edit items
router.post("/api/update", async (req, res, next) => {
  try {
    if (req.body.table === 'burger') {
      var data = await orm.updateBurger(req.body)
    } else {
      var data = await orm.updateIng(req.body)
    }
    res.json(data)
  } catch (err) {
    res.sendStatus(500)
  }
})

// create items
router.post("/api/create", async (req, res, next) => {
  try {
    if (req.body.table === 'burger') {
      var data = await orm.createBurger(req.body)
    } else {
      var data = await orm.createIng(req.body)
    }
    res.json(data)
  } catch (err) {
    res.sendStatus(500)
  }
})

// join call for nutrition
// router.get("/api/nutrition/:id", async (req, res, next) => {
//   try {
//     var data = await orm.join(req.params.id)
//     res.json(data)
//   } catch (err) {
//     console.log(err)
//     res.sendStatus(500)
//   }
// })

module.exports = router;