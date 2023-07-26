let express = require("express")

//using router method from express package
let router = express.Router()

//connecting controller file to routes
let controller = require('../Controllers/postController')

let authsMiddleWare = require("../middleware")

router.get('/posts/:id', authsMiddleWare.checkJwt, controller.getPostsFromID) //gets posts from a specific dog id

router.get('/followingPosts', authsMiddleWare.checkJwt, controller.getFollowingPosts) //gets posts from all following dog profiles based on logged in user's id

router.get('/myPosts', authsMiddleWare.checkJwt, controller.getMyPosts)//gets all posts created by user

router.delete('/post/:id', authsMiddleWare.checkJwt, controller.deletePost)//deletes a post

router.post('/createPost', authsMiddleWare.checkJwt, controller.createPost)//creates a new post

router.put('/updatePost/:id', authsMiddleWare.checkJwt, controller.updatePost)//updates a post


module.exports = router;