let express = require("express");

let app = express()

require("dotenv").config()

app.use(express.json())

let routes = require("./routes")

app.use(routes)

let PORT = process.env.DB_PORT || 9005

app.listen(PORT, function(){
  console.log("DogTag app is running on port ", PORT)
})