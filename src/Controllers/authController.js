
let jsonWebToken = require('jsonwebtoken');


let argon = require('argon2');


let db = require('../db');

const register = async function(req, res){
  let email = req.body.email;
  let password = req.body.password;


  if(!email) {
    res.status(400).send('Email field is required.');
    return;
  }


  if(!password) {
    res.status(400).send('Password field is required.');
    return;
  }

  
  let hash;
  try {
    
    hash = await argon.hash(password);
  }
  catch(err) {
    console.log('Error occurred while hashing password', err);
    res.sendStatus(500);
    return;
  }


  let sql = 'INSERT INTO dog_login (email, hash) VALUES (?,?)'; //I know the table name could be renamed with a better description.
  let params = [email, hash];  

  
  db.query(sql, params, (err, result)=> {
    if (err) {
      console.log('An error occured while trying to insert into the database.', err);
      res.sendStatus(500);
      return;
    }
    else {
      res.sendStatus(201);
      return;
    }
  })
};

const login = async (req, res) => {
  let loginEmail = req.body.email;
  let loginPwd = req.body.password;

  if(!loginEmail) {
    res.status(400).send('Email field is required.');
    return;
  }

  if(!loginPwd) {
    res.status(400).send('Password field is required.');
    return;
  }

  let sql = 'SELECT email, id, hash FROM dog_login WHERE email = ?';
  let params = [loginEmail];

  // Send query to the database
  db.query(sql, params, async (err, results)=> {
    if (err) {
      console.log('An error occured while trying to select from the database.', err);
      res.sendStatus(500);
      return;
    }

    if (results.length == 1) {
      let storedPwd = results[0].hash;
      let storedId = results[0].id;
      let storedEmail = results[0].email;

      let isCorrectPassword;
      try {
        isCorrectPassword = await argon.verify(storedPwd, loginPwd);
      }
      catch {
        console.log('An error occurred while verifying the password.')
      }

      if (isCorrectPassword) {
        
        let token = {
           id: storedId,
           email: storedEmail
        };

        // This is where we generate our token. JWT (JSON web token.)
        let signedtoken = jsonWebToken.sign(token, process.env.JWT_KEY, {expiresIn: 86400})
        res.json(signedtoken);
        return;
      };
    }

    // 401 Unauthorized is the status code to return when the client provides no credentials 
    // or invalid credentials.
    res.status(401).send("Please enter a valid email/password combination.");
  })
};


module.exports = {
  register,
  login
};