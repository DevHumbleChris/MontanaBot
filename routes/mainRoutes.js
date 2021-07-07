const route = require("express").Router()

route.get("/", (req, res) => {
  res.render("index", {
    message: 'Am Back!'
  })
})

module.exports = route
