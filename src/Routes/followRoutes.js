let express = require("express")

//using router method from express package
let router = express.Router()

//connecting controller file to routes
let controller = require('../Controllers/followController')

router.post('/newFollow', controller.newFollow)

router.delete('/unfollow', controller.unfollow)

router.get('/listFollowing/:id', controller.listFollowing)

module.export = router;