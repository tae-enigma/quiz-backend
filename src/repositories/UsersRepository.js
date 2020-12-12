const { Op } = require('sequelize');
const models = require('../models');

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
    const user = models.User.build({
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
    const user = await models.User.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  /**
   *
   * @param { Array<string> } emails
   * @return { Promise<User[]> }
   */
  async findAllByEmails(emails) {
    const users = await models.User.findAll({
      where: {
        email: {
          [Op.in]: emails,
        },
      },
    });

    return users;
  }

  async findAllStudentsByEmails(emails) {
    const users = await models.User.findAll({
      where: {
        email: {
          [Op.in]: emails,
        },
        type: 'student',
      },
    });

    return users;
  }

  /**
   *
   * @param { string } id
   * @return { Promise<User> }
   */
  async findById(id) {
    const user = await models.User.findOne({
      where: {
        id,
      },
    });

    return user;
  }
}

module.exports = UsersRepository;
