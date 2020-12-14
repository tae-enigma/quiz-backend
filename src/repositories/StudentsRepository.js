const { Op } = require('sequelize');
const models = require('../models');

/**
 * @typedef { Array<Object> } StudentQuizDTO
 * @property { string } student_id
 * @property { string } quiz_id
 * @property { number } points
 * @property { string } team
 *
 */

/**
 * @typedef { Object } StudentQuiz
 * @property { string } id
 * @property { string } student_id
 * @property { string } quiz_id
 * @property { number } points
 * @property { string } team
 * @property { Date } createdAt
 * @property { Date } updatedAt
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

  async findStudentByUserIdAndQuizId({ user_id, quiz_id }) {
    const user = await models.User.findOne({
      where: {
        id: user_id,
      },
      include: {
        model: models.StudentQuiz,
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
    const students = await models.StudentQuiz.findAll({
      where: {
        quiz_id,
      },
      include: models.User,
    });

    return students;
  }
}

module.exports = StudentsRepository;
