const jwt = require('jsonwebtoken');
import { UserObject } from "../Users/UserCrud";

// Générer un token JWT
function generateToken(user:UserObject) {
  const token = jwt.sign({ id: user.email, email: user.firstName }, 'secret', { expiresIn: '1h' });
  return token;
}

// Vérifier un token JWT
function verifyToken(req:any, res:any, next:any) {
    console.log(req.headers)
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send({ auth: false, message: 'Token non fourni.' });

  jwt.verify(token, 'secret', function(err:any, decoded:any) {
    if (err) return res.status(500).send({ auth: false, message: 'Échec de l\'authentification du token.' });

    req.userId = decoded.id;
    next();
  });
}

module.exports = { generateToken, verifyToken };
