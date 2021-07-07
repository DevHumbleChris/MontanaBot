require("dotenv").config()
require("colors")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
const mainRoutes = require("./routes/mainRoutes")

const app = express()
const PORT = process.env.PORT

// Middlewares.
app.use(morgan("tiny"))
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(express.static("public"))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// Routes.
app.use("/", mainRoutes)

app.listen(PORT, () => {
  console.log(`MontanaBot Running At ${PORT}`.bold.green)
})
