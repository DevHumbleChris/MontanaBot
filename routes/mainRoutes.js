const route = require("express").Router()
const mainControllers = require("../controllers/mainControllers")

route.post("/", mainControllers.getUserRequest)

module.exports = route
