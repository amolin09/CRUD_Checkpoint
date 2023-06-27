let express = require("express")

let router = express.Router()

let controller = require('./controller')

router.get('/dog', controller.listDogs)

router.get('/dog/:id', controller.getDog)

router.delete('/dog/:id', controller.deleteDog)

router.post('/dog', controller.addDog)

router.put('/dog/:id', controller.updateDog)

// router.patch('/dog/:id', controller.patchDog)

module.exports = router;