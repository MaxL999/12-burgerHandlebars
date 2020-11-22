var express = require("express");

var router = express.Router();

var orm = require("../orm/orm");

// search all
router.get("/api/all/:table", async (req, res, next) => {
  try {
    var data = await orm.all(req.params.table)
    res.json(data)
  } catch (err) {
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

// edit item
router.post("/api/update", async (req, res, next) => {
  try {
    console.log(req.body)
    var data = await orm.update(req.body)
    res.json(data)
  } catch (err) {
    res.sendStatus(500)
  }
})

// create item
router.post("/api/create", async (req, res, next) => {
  try {
    var data = await orm.create(req.body)
    res.json(data)
  } catch (err) {
    req.sendStatus(500)
  }
})

// join call for nutrition
router.get("/api/nutrition/:id", async (req, res, next) => {
  try {
    var data = await orm.join(req.params.id)
    res.json(data)
  } catch (err) {
    console.log(err)
    req.sendStatus(500)
  }
})

module.exports = router;