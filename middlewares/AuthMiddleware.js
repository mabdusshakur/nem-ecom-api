const jwt = require('express-jwt');
const authMiddleware = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
});

module.exports = authMiddleware;