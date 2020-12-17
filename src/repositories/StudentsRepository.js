const { Op } = require('sequelize');
const models = require('../models');

/**
 * @typedef { Array<Object> } StudentQuizDTO
 * @property { string } student_id
 * @property { string } quiz_id
 * @property { number } points
 * @property { 'radiant' | 'dire' } team
 *
 */

/**
 * @typedef { Object } StudentQuiz
 * @property { string } id
 * @property { string } student_id
 * @property { string } quiz_id
 * @property { number } points
 * @property { 'radiant' | 'dire' } team
 * @property { Date } createdAt
 * @property { Date } updatedAt
 */

/**
 * @typedef { Object } Student
 * @property { string } id
 * @property { string } name
 * @property { string } email
 * @property { string } name
 * @property { Array<StudentQuiz> } quizzes
 */
/**
 * @class StudentsRepository
 */
class StudentsRepository {
  /**
   *
   * @param {Array<StudentQuizDTO>} studentQuiz
   * @returns {Promise<Array<StudentQuiz>>}
   */
  async createMany(student_quizzes) {
    const students = await models.StudentQuiz.bulkCreate(student_quizzes);

    return students;
  }

  /**
   *
   * @param { Object } request
   * @param { string } request.user_id
   * @param { string } request.quiz_id
   * @returns { Promise<Student> }
   */
  async findStudentByUserIdAndQuizId({ user_id, quiz_id }) {
    const user = await models.User.findOne({
      where: {
        id: user_id,
      },
      include: {
        model: models.StudentQuiz,
        as: 'quizzes',
        where: {
          quiz_id,
        },
        required: true,
      },
    });

    return user;
  }

  async findAllByStudentsIdFromQuiz(students_ids, quiz_id) {
    const students = await models.StudentQuiz.findAll({
      where: {
        id: {
          [Op.in]: students_ids,
        },
        quiz_id,
      },
      include: models.User,
    });

    return students;
  }

  async findAllStudentsByQuizId(quiz_id) {
    const students = await models.User.findAll({
      attributes: {
        exclude: ['password'],
      },
      include: {
        model: models.StudentQuiz,
        as: 'quizzes',
        where: {
          quiz_id,
        },
      },
    });

    return students;
  }

  async findQuizRankingByQuizId(quiz_id) {
    const ranking = await models.User.findAll({
      include: {
        model: models.StudentQuiz,
        as: 'quizzes',
        where: {
          quiz_id,
        },
        include: {
          model: models.Answer,
          as: 'answers',
        },
      },
    });

    return ranking;
  }
}

module.exports = StudentsRepository;
