const {Option} = require('../models')

/**
 * @typedef { Array <Object> } OptionDTO
 * @property { string } description
 * @property { bool } is_correct
 * @property { string } question_id
 */

/**
 * @typedef { Array <Promise<Object>> } Option
 * @property { string } id
 * @property { string } description
 * @property { bool } is_correct
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
  async create(options, t){
     return await Option.bulkCreate(options, {transaction: t})

  }
}

module.exports = OptionsRepository