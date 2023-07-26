let db = require("../db");

let getPostsFromID = function(req, res){
  let dogid = req.params.dogid

  let sql = 'select * from post_table where dog_id = ?'

  let params = [dogid]

  db.query(sql, params, function(err, results){

    if(err){
      console.log('Fail to query database\n', err);
      res.sendStatus(500)
    }
    else{
   
      if(results.length == 0){
        res.sendStatus(404);
      }
      else{
       
        res.json(results[0]);
      }
    }
  })
}

let getMyPosts = function(req, res){
  
  let userid = req.userinfo.id

  let sql = 'select * from post_table INNER JOIN dog_info ON post_table.dog_id = dog_info.id WHERE dog_info.user_id = ?'

  let params = [userid]

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

let getFollowingPosts = function(req, res){
  
  let user_id = req.userinfo.id

  let sql = 'SELECT post_table.title, post_table.body, post_table.img FROM post_table INNER JOIN follows ON post_table.dog_id=follows.followed_dog_id WHERE follows.following_user_id = ?'

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

let createPost = function(req, res){
  //storing the values from the req body into variables
  let title = req.body.title
  let body = req.body.body
  let photo = req.body.photo
  let dogid = req.body.dogid

  //name cannot be null, this checks to make sure there is a value for name
  if(!title){
    res.status(400).json('Title is required');
    return;
  }

  let sql = `insert into post_table (title, body, photo, dog_id) values (?, ?, ?, ?)`

  let params = [title, body, photo, dogid];//storing external input into an array

  db.query(sql, params, function(err, results){
    //if error, display message along with err object and status 500
    if(err){
      console.log("Failed to create post\n", err)
      res.sendStatus(500)
    }
    else{
       //if successful, send status 204. nothing was returned but the query was successful
      res.sendStatus(204)
    }
  })
}

let updatePost = function(req, res){
  //storing the values from the req body into variables
  let id = req.params.id
  let title = req.body.title
  let body = req.body.body
  let img = req.body.img
  let dogid = req.body.dogid


  //name cannot be null, this checks to make sure there is a value for name
  if(!title){
    res.status(400).json('Title is required.')
    return
  }

  let sql = `update post_table set title = ?, body = ?, img = ?, dog_id = ? where id = ?`//sql code to insert, replaces the entry with new info from the req body

  let params = [title, body, img, dogid, id]//storing external input into an array

  db.query(sql, params, function(err, results){
    //if error, display message along with err object and status 500
    if(err){
      console.log('Failed to update the database\n', err)
      res.sendStatus(500)
    }
    else{
       //if successful, send status 204. nothing was returned but the query was successful
      res.sendStatus(204);
    }
  })
}

let deletePost = function(req, res){

  let id = req.params.id//get id from route params
  let sql = `delete from post_table where id = ?`//sql code to insert, deletes an entry from the database
  let params = [id]//storing external input into an array

  db.query(sql, params, function(err, results){
    //if error, display message along with err object and status 500
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

module.exports = {
  getPostsFromID,
  getFollowingPosts,
  getMyPosts,
  createPost,
  updatePost,
  deletePost
}