let express = require("express")

//using router method from express package
let router = express.Router()

//connecting controller file to routes
let controller = require('../Controllers/followController')

let authsMiddleWare = require("../middleware")

router.post('/newFollow', authsMiddleWare.checkJwt, controller.newFollow)

router.delete('/unfollow/:dogid', authsMiddleWare.checkJwt, controller.unfollow)

router.get('/listFollowing', authsMiddleWare.checkJwt, controller.listFollowing)

module.exports = router;