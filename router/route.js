var router = require("express").Router();

var orm = require("../orm/orm");

// search all
router.get("/api/search", async (req, res, next) => {
  try {
    var burgers = await orm.table("burger")
    var ingredients = await orm.table("ingredients")
    res.json({ burgers, ingredients })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// unused//old
// restore website data
// router.post("/api/restore", async (req, res, next) => {
//   try {
//     var data = await orm.restore()
//     res.json(data)
//   } catch (err) {
//     res.sendStatus(500)
//   }
// })

// delete item
router.delete("/api/:table/:id", async (req, res, next) => {
  try {
    if (req.params.table === "burger") {
      orm.deleteBurger(req.params.id)
        .then(orm.table("burger")
          .then(response => res.json(response))
        )
    } else {
      orm.deleteIngredient(req.params.id)
        .then(orm.table("ingredients")
          .then(response => res.json(response))
        )
    }
  } catch (err) {
    console.log(err)
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