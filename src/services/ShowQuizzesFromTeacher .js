const QuizzesRepository = require('../repositories/QuizzesRepository')

 /**
 * @typedef { Object } Quiz
 *  @property { string } id
 * @property { string } name
 * @property { date } time_limit
 * @property { number } question_qty_limit
 * @property { number } question_team_qty_limit
 * @property { string } teacher_id
 * @property { Date } createdAt
 * @property { Date } updatedAt
 */
/**
 * @constructor
 */
class ShowQuizzesFromTeacher {
  constructor() {
    this.quizzesRepository = new QuizzesRepository()
  }

  /**
   * 
   * @param {String} student_id 
   * @returns {Promise<Array<Quiz>>}
   */
  async execute(student_id){
    const quizzes = await this.quizzesRepository.findAllByTeacherId(student_id)

    return quizzes
  }
}

module.exports = ShowQuizzesFromTeacher