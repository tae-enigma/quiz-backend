const { User } = require('../models');

class CreateUserService {
  async execute({ name, email, password, type }) {
    const user = await User.create({ name, email, password, type });

    return user;
  }
}

module.exports = CreateUserService;
