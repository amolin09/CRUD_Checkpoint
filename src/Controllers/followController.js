let db = require("../db");

let newFollow = function(req, res){
  //storing the values from the req body into variables
  let followingID = req.userinfo.id
  let followedID = req.body.followed_dog_id
  let relationship = req.body.relationship

  let sql = `insert into follows (following_user_id, followed_dog_id, relationship) values (?, ?, ?)`

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

let unfollow = function(req, res){

  let dogid = req.params.dogid
  let userid = req.userinfo.id

  let sql = `delete from follows where followed_dog_id = ? and following_user_id = ?`

  let params = [dogid, userid]

  db.query(sql, params, function(err, results){
    if(err){
      console.log('Delete query failed\n', err)
      res.sendStatus(500)
    }
    else{
      //if successful, send status 204. nothing was returned but the query was successful
      res.sendStatus(204)
    }
  })
}


let listFollowing = function(req, res){

let user_id = req.userinfo.id

  let sql = `SELECT follows.followed_dog_id, dog_info.name,follows.relationship FROM follows INNER JOIN dog_info ON follows.followed_dog_id = dog_info.id WHERE following_user_id = ?`

  let params = [user_id]

  db.query(sql, params, function(err, results){

    if(err){
      console.log('Fail to query database\n', err);
      res.sendStatus(500)
    }
    else{
       
        res.json(results);

    }
  })
}

module.exports = {
  newFollow,
  unfollow,
  listFollowing
}