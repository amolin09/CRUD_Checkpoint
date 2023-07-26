//using express
let express = require("express")

//using router method from express package
let router = express.Router()

//connecting controller file to routes
let controller = require('../Controllers/controller')


let authsMiddleWare = require("../middleware")

//creates get route to call listDogs from controller 
router.get('/dog', controller.listDogs)

//creates get route to call getDog from controller 
router.get('/dog/:id', controller.getDog)

//creates get route to call deleteDog from controller 
router.delete('/dog/:id', authsMiddleWare.checkJwt, controller.deleteDog)

//creates get route to call addDog from controller 
router.post('/dog', authsMiddleWare.checkJwt, controller.addDog)

//creates get route to call updateDog from controller 
router.put('/dog/:id', authsMiddleWare.checkJwt, controller.updateDog)

// router.patch('/dog/:id', controller.patchDog)

module.exports = router;