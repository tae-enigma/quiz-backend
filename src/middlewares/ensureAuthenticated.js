const { verify } = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    response.status(501).json({ error: 'JWT token is missing' });
  }
};
