var router = require("express").Router();

var orm = require("../orm/orm");

// compares 2 arrays and find what is missing from second array
function arrayDifference(arrOne, arrTwo) {
  let returnVal = [];
  for (i in arrOne) {
    if (!arrTwo.includes(arrOne[i])) returnVal.push(arrOne[i])
  }
  return returnVal;
}

// search all
router.get("/api/search", (req, res) => {
  try {
    orm.selectBurger().then(burgers =>
      orm.selectIng().then(ingredients =>
        res.json({ burgers, ingredients })
      )
    )
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// delete item
router.delete("/api/:table/:id", (req, res) => {
  try {
    if (req.params.table === "burgers") {
      orm.deleteBurger(req.params.id).then(
        orm.selectBurger().then(response =>
          res.json(response)
        )
      )
    } else {
      orm.deleteIngredient(req.params.id).then(
        orm.selectIng().then(response =>
          res.json(response)
        )
      )
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// edit items
router.post("/api/update/:table", async (req, res) => {
  try {
    if (req.params.table === 'burgers') {
      // must sort out and edit the burger_ingredients table before updating the burger table
      // find current database values
      orm.selectBurgerIng(req.body.id).then(oldBurger => {
        // organize values
        var oldData = [];
        for (i in oldBurger) oldData.push(oldBurger[i].ingredient_id);
        var newData = [...new Set(req.body.ingArr)];

        // values missing from newData needed for deletion
        let deleteArr = arrayDifference(oldData, newData)
        // values missing from oldData needed for insertion
        let insertArr = arrayDifference(newData, oldData)

        // delete undesired if necessary
        if (deleteArr.length) {
          orm.deleteBurgerIngredients(req.body.id, deleteArr)
        }

        // insert desired if necessary
        if (insertArr.length) {
          orm.createBurgerIngredients(req.body.id, insertArr)
        }

        // update burger table I.E. name and IngOrderArray
        orm.updateBurger(req.body).then(
          orm.selectBurger().then(response =>
            res.json(response)
          )
        )
      })
    } else {
      orm.updateIng(req.body).then(
        orm.selectIng(response =>
          res.json(response)
        )
      )
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// create items
router.post("/api/create/:table", async (req, res, next) => {
  try {
    if (req.params.table === 'burgers') {
      orm.createBurger(req.body).then(id =>
        orm.createBurgerIngredients(id, req.body.burgerArr).then(
          orm.selectBurger().then(response =>
            res.json(response)
          )
        )
      )
    } else {
      orm.createIng(req.body).then(
        orm.selectIng().then(response =>
          res.json(response)
        )
      )
    }
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


module.exports = router;