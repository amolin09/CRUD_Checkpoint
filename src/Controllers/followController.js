let db = require("../db");

let newFollow = function(req, res){
  //storing the values from the req body into variables
  let followingID = req.body.follwing_user_id
  let followedID = req.body.followed_dog_id
  let relationship = req.body.relationship

  let sql = `insert into follows (following_user_id, followed_dog_id, relaionship) values (?, ?, ?)`

  let params = [followingID, followedID, relationship];//storing external input into an array

  db.query(sql, params, function(err, results){
    //if error, display message along with err object and status 500
    if(err){
      console.log("Failed to follow\n", err)
      res.sendStatus(500)
    }
    else{
       //if successful, send status 204. nothing was returned but the query was successful
      res.sendStatus(204)
    }
  })
}

module.exports = {
  createPost,
  updatePost,
  deletePost
}