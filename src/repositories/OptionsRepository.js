const models = require('../models');

/**
 * @typedef { Object } OptionDTO
 * @property { string } description
 * @property { boolean } is_correct
 * @property { string } question_id
 */

/**
 * @typedef { Object } Option
 * @property { string } id
 * @property { string } description
 * @property { boolean } is_correct
 * @property { string } question_id
 * @property { Date } createdAt
 * @property { Date } updatedAt
 */

/**
 * @class OptionsRepository
 */
class OptionsRepository {
  /**
   * @param {Array<OptionDTO>} data
   * @returns {Promise<Array<Option>>}
   */
  async create(data, t) {
    const options = await models.Option.bulkCreate(data, { transaction: t });

    return options;
  }

  /**
   *
   * @param { strin } id
   * @returns { Promise<Option> }
   */
  async findById(id) {
    const option = await models.Option.findOne({
      where: { id },
    });

    return option;
  }
}

module.exports = OptionsRepository;
