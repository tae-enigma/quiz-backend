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
 * @property { Array<Option> } options
 * @property { Date } createdAt
 * @property { Date } updatedAt
 */

/**
 * @typedef { Object } Option
 * @property { string } id
 * @property { string } description
 * @property { boolean } is_correct
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
   * @param {string} id
   * @return { Promise<QuestionDTO> }
   */

  async findById(id) {
    const question = await models.Question.findOne({
      where: {
        id,
      },
      include: {
        model: models.Option,
        as: 'options',
      },
    });

    return question;
  }

  /**
   *
   * @param {QuestionDTO} question
   * @returns {Promise<QuestionDTO>}
   */
  async save(question) {
    const savedQuestion = await question.save();

    return savedQuestion;
  }

  /**
   *
   * @param {QuestionDTO} data
   * @returns {Promise<number>}
   */
  async linkToQuiz({ question_id, quiz_id }) {
    const [result] = await models.Question.update(
      { quiz_id },
      {
        where: {
          id: question_id,
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

  /**
   *
   * @param { Object } request
   * @param { string } request.quiz_id
   * @param { 'dire' | 'radiant' } request.team
   *
   * @returns { Array<Question> }
   */

  async findSelectedQuestionsByQuizIdAndStudentsTeam({ quiz_id, team }) {
    const questions = await models.Question.findAll({
      where: { quiz_id, team, is_selected: true },
      order: [['level']],
      include: {
        model: models.Option,
        as: 'options',
        attributes: {
          exclude: ['is_correct'],
        },
      },
    });

    return questions;
  }
}

module.exports = QuestionsRepository;
