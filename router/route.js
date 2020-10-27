var express = require("express");

var router = express.Router();

var orm = require("../orm/orm");


router.get("/api/all/:table", async (req, res, next) => {
  try {
    let data = await orm.all(req.params.table)
    res.json(data)
  } catch (err) {
    res.sendStatus(500)
  }
})

router.delete("/api/:table/:id", async (req, res, next) => {
  try {
    await orm.delete(req.params.table, req.params.id)
    let data = await orm.all(req.params.table)
    res.json(data)
  } catch (err) {
    res.sendStatus(500)
  }
})


router.post("/api/update", async (req, res, next) => {
  try {
    console.log(req.body)
    await orm.update(req.body)
    // let data = await orm.all(req.params.table)
    // res.json(data)
  } catch (err) {
    res.sendStatus(500)
  }
})

router.post("/api/create", async (req, res, next) => {
  try {
    await orm.create(req.body)
  } catch (err) {
    req.sendStatus(500)
  }
})

router.get("/api/nutrition/:id", async (req, res, next) => {
  try {
    console.log(req.params.id)
    await orm.join(req.params.id)
  } catch (err) {
    console.log(err)
    req.sendStatus(500)
  }
})

module.exports = router;