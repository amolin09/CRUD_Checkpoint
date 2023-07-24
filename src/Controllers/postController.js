let db = require("../db");

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
  let photo = req.body.photo
  let dogid = req.body.dogid


  //name cannot be null, this checks to make sure there is a value for name
  if(!title){
    res.status(400).json('Title is required.')
    return
  }

  let sql = `update post_table set title = ?, body = ?, photo = ?, dog_id = ? where id = ?`//sql code to insert, replaces the entry with new info from the req body

  let params = [title, body, photo, dogid, id]//storing external input into an array

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
  createPost,
  updatePost,
  deletePost
}