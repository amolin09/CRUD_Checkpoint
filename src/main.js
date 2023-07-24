//using express
let express = require("express");

let app = express()

//allow to use environment file
require("dotenv").config()

app.use(express.json())

// using routes
let dogRoutes = require("./Routes/routes")

app.use(dogRoutes)

let authRoutes = require("./Routes/authRoutes")

app.use(authRoutes)

// let protectionRoutes = require("./Routes/protectedRoutes")

// app.use(protectionRoutes)

let postRoutes = require("./Routes/postRoutes")

app.use(postRoutes)

let followRoutes = require("./Routes/followRoutes")

app.use(followRoutes)

app.use("../public")

//setting port to DB_PORT variable from .env
let PORT = process.env.DB_PORT || 3306

//app listening on port
app.listen(PORT, function(){
  console.log("DogTag app is running on port ", PORT)
})