const jwt = require('jsonwebtoken');


const checkJwt = function(req, res, next){


  let value = req.get('Authorization');
  let signedToken;


 
  if (value) {
   
    let tokenParts = value.split(" ");
    if(tokenParts[0] == 'Bearer' && tokenParts[1]){
      signedToken = tokenParts[1];
    }
  }

    try {
      let decodedToken = jwt.verify(signedToken, process.env.JWT_KEY);
      req.userinfo = decodedToken
      next();
    }
    catch(err){
    
      console.log('Failed to verify JWT', err);
      res.sendStatus(401)
      return;
    };

   
 
}

module.exports = {
  checkJwt
};