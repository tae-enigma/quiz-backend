const { hash } = require('bcryptjs');
const UsersRepository = require('../repositories/UsersRepository');

/**
 * @typedef { Object } Request
 * @property { string } name
 * @property { string } email
 * @property { string } password
 * @property { string } type
 *
 */

/**
 * @typedef { Object } User
 * @property { string } id
 * @property { string } name
 * @property { string } email
 * @property { string } password
 * @property { string } type
 * @property { Date } createdAt
 * @property { Date } updatedAt
 */

/**
 * Instance a CreateUserService
 * @constructor
 */
class CreateUserService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  /**
   *
   * @param { Request } data
   * @returns { Promise<User> }
   */
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
