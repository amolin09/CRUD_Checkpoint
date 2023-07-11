//using database connection
let db = require("../db");

//should return a summary of all the entries in the database
let listDogs = function(req, res){

    let sql = "select id, name, breed from dog_info" //the sql code to be inserted, lists the id, name and breed of all entries

    db.query(sql, function(err, results){
      //if error, display message along with err object and status 500
      if(err){
        console.log('Fail to query database\n', err);
        res.sendStatus(500);
      }
      else{
        //if everything is good, return the results
        res.json(results);
      }
    })
}

//should return the full details of a single entry in the database
let getDog = function(req, res){


  let id = req.params.id//get id from route params

  let sql = `select * from dog_info where id = ?` //sql code to insert, selects a single entry determined by the id
  let params = [id]//storing external input into an array

  db.query(sql, params, function(err, results){
    //if error, display message along with err object and status 500
    if(err){
      console.log('Fail to query database\n', err);
      res.sendStatus(500)
    }
    else{
      //if no entries match the id, return a 404
      if(results.length == 0){
        res.sendStatus(404);
      }
      else{
        //if everything is good, only one entry will be stored in results object so we can return it.
        res.json(results[0]);
      }
    }
  })
}

//should delete a single entry from the database
let deleteDog = function(req, res){

  let id = req.params.id//get id from route params
  let sql = `delete from dog_info where id = ?`//sql code to insert, deletes an entry from the database
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

//should add a new entry to the database
let addDog = function(req, res){
  //storing the values from the req body into variables
  let name = req.body.name
  let breed = req.body.breed
  let age = req.body.age
  let gender = req.body.gender
  let housebroken = req.body.housebroken

  //name cannot be null, this checks to make sure there is a value for name
  if(!name){
    res.status(400).json('Name is required');
    return;
  }

  let sql = `insert into dog_info (name, breed, age, gender, housebroken) values (?, ?, ?, ?, ?)`//sql code to insert, adds a new entry to the database

  let params = [name, breed, age, gender, housebroken];//storing external input into an array

  db.query(sql, params, function(err, results){
    //if error, display message along with err object and status 500
    if(err){
      console.log("Failed to add entry\n", err)
      res.sendStatus(500)
    }
    else{
       //if successful, send status 204. nothing was returned but the query was successful
      res.sendStatus(204)
    }
  })
}

let updateDog = function(req, res){
  //storing the values from the req body into variables
  let id = req.params.id
  let name = req.body.name
  let breed = req.body.breed
  let age = req.body.age
  let gender = req.body.gender
  let housebroken = req.body.housebroken

  //name cannot be null, this checks to make sure there is a value for name
  if(!name){
    res.status(400).json('Name is required.')
    return
  }

  let sql = `update dog_info set name = ?, breed = ?, age = ?, gender = ?, housebroken = ? where id = ?`//sql code to insert, replaces the entry with new info from the req body

  let params = [name, breed, age, gender, housebroken, id]//storing external input into an array

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

//exports all functions as a single object to be used in other files
module.exports = {
  listDogs,
  getDog,
  deleteDog,
  addDog,
  updateDog,
  // patchDog
}