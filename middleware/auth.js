require('dotenv').config();

const jwt = require('jsonwebtoken');

const authMiddleware = (request, response, next) => {
  const token = request.header('x-auth-token');

  if (!token) return response.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);
    response.status(401).send('Not authorized');
  }
};

module.exports = authMiddleware;
