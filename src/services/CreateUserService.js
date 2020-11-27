const { hash } = require('bcryptjs');
const UsersRepository = require('../repositories/UsersRepository');

class CreateUserService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async execute({ name, email, password, type }) {
    if (type !== 'student' && type !== 'teacher') {
      throw new Error('Invalid user type');
    }

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new Error('The email address has already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      type,
    });

    return user;
  }
}

module.exports = CreateUserService;
