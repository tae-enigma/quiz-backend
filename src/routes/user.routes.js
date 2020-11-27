const { Router } = require('express');
const CreateUserService = require('../services/CreateUserService');

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password, type } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, email, password, type });

  return response.json(user);
});

module.exports = usersRouter;
