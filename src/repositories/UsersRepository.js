const { User } = require('../models');

/**
 * @typedef { Object } UserDTO
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
 * @class UsersRepository
 */
class UsersRepository {
  /**
   *
   * @param { UserDTO } data
   * @returns { Promise<User> }
   */
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

  /**
   *
   * @param { string } email
   * @return { Promise<User> }
   */
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
