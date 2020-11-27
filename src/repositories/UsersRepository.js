const { User } = require('../models');

class UsersRepository {
  async create({ name, email, password, type }) {
    const user = User.build({
      name,
      email,
      password,
      type,
    });

    await user.save();

    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

module.exports = UsersRepository;
