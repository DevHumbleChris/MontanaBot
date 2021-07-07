const route = require("express").Router()
const mainControllers = require("../controllers/mainControllers")

route.get("/", (req, res) => {
  res.render("index", {
    message: 'Am Back!'
  })
})

route.post("/", mainControllers.getUserRequest)

module.exports = route
