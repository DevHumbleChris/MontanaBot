require("dotenv/config")
require("colors")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
const PORT = process.env.PORT

app.use(morgan("tiny"))
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.listen(PORT, () => {
  console.log(`MontanaBot Running At ${PORT}`.bold.green)
})