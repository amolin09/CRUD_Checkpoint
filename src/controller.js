let db = require("./db");

let listDogs = function(req, res){
    //should return a summary of all the entries in the database
    let sql = "select id, name, breed from dog_info"

    db.query(sql, function(err, results){
      if(err){
        console.log('Fail to query database', err);
        res.sendStatus(500);
      }
      else{
        res.json(results);
      }
    })
}

let getDog = function(req, res){
  let id = req.params.id
  let sql = `select * from dog_info where id = ?`
  let params = [id]

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

let deleteDog = function(req, res){
  let id = req.params.id
  let sql = `delete from dog_info where id = ?`
  let params = [id]

  db.query(sql, params, function(err, results){
    if(err){
      console.log('Delete query failed\n', err)
      res.sendStatus(500)
    }
    else{
      res.sendStatus(204)
    }
  })
}

let addDog = function(req, res){
  let name = req.body.name
  let breed = req.body.breed
  let age = req.body.age
  let gender = req.body.gender
  let housebroken = req.body.housebroken

  if(!name){
    res.status(400).json('Name is required');
    return;
  }

  let sql = `insert into dog_info (name, breed, age, gender, housebroken) values (?, ?, ?, ?, ?)`

  let params = [name, breed, age, gender, housebroken];

  db.query(sql, params, function(err, results){
    if(err){
      console.log("Failed to add entry\n", err)
      res.sendStatus(500)
    }
    else{
      res.sendStatus(204)
    }
  })
}

let updateDog = function(req, res){
  let id = req.params.id
  let name = req.body.name
  let breed = req.body.breed
  let age = req.body.age
  let gender = req.body.gender
  let housebroken = req.body.housebroken

  if(!name){
    res.status(400).json('Name is required.')
    return
  }

  let sql = `update dog_info set name = ?, breed = ?, age = ?, gender = ?, housebroken = ? where id = ?`

  let params = [name, breed, age, gender, housebroken, id]

  db.query(sql, params, function(err, results){
    if(err){
      console.log('Failed to update the database\n', err)
      res.sendStatus(500)
    }
    else{
      res.sendStatus(204);
    }
  })
}

module.exports = {
  listDogs,
  getDog,
  deleteDog,
  addDog,
  updateDog,
  // patchDog
}