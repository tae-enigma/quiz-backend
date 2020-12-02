const {Quiz} = require('../models')

console.log(Quiz)

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
 *  @property { string } id
 * @property { string } name
 * @property { date } time_limit
 * @property { number } question_qty_limit
 * @property { number } question_team_qty_limit
 * @property { string } teacher_id
 * @property { Date } createdAt
 * @property { Date } updatedAt
 */

class QuizzesRepository {

  /**
   * 
   * @param {QuizDTO} quiz 
   * @returns {Promise<Quiz>}
   */
  async create({name, time_limit, question_qty_limit, question_team_qty_limit, teacher_id}){
    const quiz = Quiz.build({
      name, 
      time_limit, 
      question_qty_limit, 
      question_team_qty_limit, 
      teacher_id
    });

    await quiz.save();

    return quiz
  }
}

module.exports = QuizzesRepository