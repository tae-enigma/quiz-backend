const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const authConfig = require('../config/auth');
const UsersRepository = require('../repositories/UsersRepository');
/**
 * @typedef { Object } Request
 * @property { string } email
 * @property { string } password
 */

/**
 * @class
 */
class AuthenticateUserService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  /**
   *
   * @param { Request } data
   */
  async execute({ email, password }) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Invalid credentials');
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: JSON.stringify({ id: user.id, type: user.type }),
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

module.exports = AuthenticateUserService;
