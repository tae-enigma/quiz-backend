const { Router } = require('express');
const CreateUserService = require('../services/CreateUserService');

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password, type } = request.body;

  try {
    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password, type });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

module.exports = usersRouter;
