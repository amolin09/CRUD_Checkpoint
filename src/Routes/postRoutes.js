let express = require("express")

//using router method from express package
let router = express.Router()

//connecting controller file to routes
let controller = require('../Controllers/postController')

router.get('/posts/:id', controller.getPosts)

router.get('/followingPosts/:id', controller.getFollowingPosts)

router.delete('/post/:id', controller.deletePost)

router.post('/createPost',  controller.createPost)

router.put('/updatePost/:id', controller.updatePost)


module.exports = router;