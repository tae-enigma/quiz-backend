const { Quiz } = require('../models');

/**
 * @typedef { Object } QuizDTO
 * @property { string } name
 * @property { date } time_limit
 * @property { number } question_qty_limit
 * @property { number } question_team_qty_limit
 * @property { string } teacher_id
 */

/**
 * @typedef { Object } Quiz
 * @property { string } id
 * @property { string } name
 * @property { date } time_limit
 * @property { number } question_qty_limit
 * @property { number } question_team_qty_limit
 * @property { string } teacher_id
 * @property { Date } createdAt
 * @property { Date } updatedAt
 */

/**
 * @class QuizzesRepository
 */
class QuizzesRepository {
  /**
   *
   * @param {QuizDTO} quiz
   * @returns {Promise<Quiz>}
   */
  async create({
    name,
    time_limit,
    question_qty_limit,
    question_team_qty_limit,
    teacher_id,
  }) {
    const quiz = Quiz.build({
      name,
      time_limit,
      question_qty_limit,
      question_team_qty_limit,
      teacher_id,
    });

    await quiz.save();

    return quiz;
  }

  async findAllByTeacherId(teacher_id) {
    const quizzes = await Quiz.findAll({
      where: {
        teacher_id,
      },
    });

    return quizzes;
  }
}

module.exports = QuizzesRepository;
