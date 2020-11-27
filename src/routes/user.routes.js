const { Router } = require('express');
const { User } = require('../models');

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password, type } = request.body;

  const user = await User.create({ name, email, password, type });

  console.log(user);

  return response.json(user);
});

module.exports = usersRouter;
