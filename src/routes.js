//using express
let express = require("express")

//using router method from express package
let router = express.Router()

//connecting controller file to routes
let controller = require('./controller')

//creates get route to call listDogs from controller 
router.get('/dog', controller.listDogs)

//creates get route to call getDog from controller 
router.get('/dog/:id', controller.getDog)

//creates get route to call deleteDog from controller 
router.delete('/dog/:id', controller.deleteDog)

//creates get route to call addDog from controller 
router.post('/dog', controller.addDog)

//creates get route to call updateDog from controller 
router.put('/dog/:id', controller.updateDog)

// router.patch('/dog/:id', controller.patchDog)

module.exports = router;