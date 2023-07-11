let express = require("express")

let router = express.Router()

let authsMiddleWare = require("../middleware")

//unprotected route
router.get("/public", function(req, res){
  res.json("You can see me!")
})

router.get("/secret", authsMiddleWare.checkJwt, function(req, res){
  res.json("You found my secret")
})

module.exports = router