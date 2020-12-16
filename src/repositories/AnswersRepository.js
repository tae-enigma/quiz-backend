const models = require('../models');

/**
 * @typedef { Object } AnswerDTO
 * @property { string } student_id
 * @property { string } option_id
 * @property { 'hit' | 'miss' } type
 * @property { Number } gold
 * @property { Number } xp
 *
 */

/**
 * @typedef { Object } Answer
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
   * @param { AnswerDTO } data
   * @returns { Promise<Answer> }
   */
  async create({ student_id, option_id, xp, gold, type }) {
    const answer = models.Answer.build({
      student_id,
      option_id,
      xp,
      gold,
      type,
    });

    await answer.save();

    return answer;
  }
}

module.exports = AnswersRepository;
