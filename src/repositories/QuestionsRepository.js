const models = require('../models');

/**
 * @typedef { Object } QuestionDTO
 * @property { text } description
 * @property { string } team
 * @property { number } level
 * @property { boolean } is_selected
 * @property { string} student_id
 * @property { string } quiz_id
 */

/**
 * @typedef { Object } Question
 * @property { string } id
 * @property { text } description
 * @property { string } team
 * @property { number } level
 * @property { boolean } is_selected
 * @property { string} student_id
 * @property { string } quiz_id
 * @property { Date } createdAt
 * @property { Date } updatedAt
 */

/**
 * @class QuestionsRepository
 */
class QuestionsRepository {
  /**
   *
   * @param {QuestionDTO} quiz
   * @returns {Promise<Question>}
   */
  async create(
    { description, team, student_id, quiz_id, level, is_selected },
    t,
  ) {
    const question = await models.Question.create(
      {
        description,
        team,
        level,
        is_selected,
        student_id,
        quiz_id,
      },
      { transaction: t },
    );

    return question;
  }

  /**
   *
   * @param {QuestionDTO} data
   * @returns {Promise<number>}
   */
  async linkToQuiz({ id, quiz_id }) {
    const [result] = await models.Question.update(
      { quiz_id },
      {
        where: {
          id,
        },
      },
    );

    return result;
  }

  async findAllByQuizId(quiz_id) {
    const questions = await models.Question.findAll({
      where: { quiz_id },
      include: {
        model: models.Option,
        as: 'options',
      },
    });

    return questions;
  }

  async findAllByQuizIdAndStudentTeam({ quiz_id, team }) {
    const questions = await models.Question.findAll({
      where: { quiz_id, team },
      include: {
        model: models.Option,
        as: 'options',
      },
    });

    return questions;
  }
}

module.exports = QuestionsRepository;
