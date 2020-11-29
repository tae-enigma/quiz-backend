const { Router } = require('express');
const AuthenticateUserService = require('../services/AuthenticateUserService');

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  try {
    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({ email, password });

    delete user.password;

    return response.json({
      user,
      token,
    });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

module.exports = sessionsRouter;
