const {Answer} = require('../models')

/**
 * @typedef { Object } AnswersDTO
 * @property { string } student_id
 * @property { string } option_id
 *
 */

/**
 * @typedef { Object } Answers
 * @property { string } id
 * @property { string } student_id
 * @property { string } option_id
 * @property { Date } createdAt
 * @property { Date } updatedAt
 */

/**
 * @class AnswersRepository
 */
class AnswersRepository {

  /**
   * 
   * @param {AnswersDTO} data
   * @returns {Promise<Answers>} 
   */
  async create({student_id, option_id}){
    const answer = Answer.build({
      student_id, 
      option_id
    })

    await answer.save()

    return answer
  }
}

module.exports = AnswersRepository