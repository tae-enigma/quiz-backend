const { hash } = require('bcryptjs');
const { User } = require('../models');

class CreateUserService {
  async execute({ name, email, password, type }) {
    if (type !== 'student' && type !== 'teacher') {
      throw new Error('Invalid user type');
    }

    const checkUserExists = await User.findOne({
      where: {
        email,
      },
    });

    if (checkUserExists) {
      throw new Error('The email address has already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = User.build({
      name,
      email,
      password: hashedPassword,
      type,
    });

    await user.save();

    return user;
  }
}

module.exports = CreateUserService;
