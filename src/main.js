//using express
let express = require("express");

let app = express()

//allow to use environment file
require("dotenv").config()

app.use(express.json())

// using routes
let routes = require("./routes")

app.use(routes)

//setting port to DB_PORT variable from .env
let PORT = process.env.DB_PORT || 9005

//app listening on port
app.listen(PORT, function(){
  console.log("DogTag app is running on port ", PORT)
})