const { StudentQuiz } = require('../models');

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
  * @constructor StudentQuizzesRepository
  */
class StudentQuizzesRepository {

  /**
   * 
   * @param {Array<StudentQuizDTO>} studentQuiz
   * @returns {Promise<Array<StudentQuiz>>}
   */
  async create(student_quizzes){
    const students = await StudentQuiz.bulkCreate(student_quizzes)

    return students
  }
}

module.exports = StudentQuizzesRepository