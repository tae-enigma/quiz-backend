const models = require('../models');

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
 * @property { number } time_limit
 * @property { Date } start
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
    const quiz = models.Quiz.build({
      name,
      time_limit,
      question_qty_limit,
      question_team_qty_limit,
      teacher_id,
    });

    await quiz.save();

    return quiz;
  }

  /**
   *
   * @param {string} id
   * @return { Promise<Quiz> }
   */
  async findById(id) {
    const quiz = await models.Quiz.findOne({
      where: { id },
      include: {
        model: models.User,
        as: 'teacher',
        attributes: {
          exclude: ['password'],
        },
      },
    });
    return quiz;
  }

  async findAllByTeacherId(teacher_id) {
    const quizzes = await models.Quiz.findAll({
      where: {
        teacher_id,
      },
      include: {
        model: models.User,
        as: 'teacher',
        attributes: {
          exclude: ['password'],
        },
      },
    });

    return quizzes;
  }

  async findAllByStudentId(student_id) {
    const quizzes = await models.Quiz.findAll({
      include: [
        {
          model: models.StudentQuiz,
          where: {
            student_id,
          },
        },
        {
          model: models.User,
          as: 'teacher',
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    });

    return quizzes;
  }

  async updateStartQuiz({ quiz_id, date_time }) {
    const [result] = await models.Quiz.update(
      { start: date_time },
      {
        where: {
          id: quiz_id,
        },
      },
    );

    return result;
  }
}

module.exports = QuizzesRepository;
