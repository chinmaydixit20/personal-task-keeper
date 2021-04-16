const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const dec =  jwt.verify(token, config.get('jwtSecret')); 
    req.user = dec;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Incorrect Token' });
  }
}

module.exports = auth;