const { Question } = require('../models')

/**
 * @typedef { Object } QuizDTO
* @property { string } team
 * @property { number } level
 * @property { boolean } is_selected
 * @property { string} student_id
 * @property { string } quiz_id
 */

 /**
 * @typedef { Object } Quiz
 * @property { string } id
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
  async create({team, level, is_selected, student_id, quiz_id}){
    const question = Question.build({
        team,
        level,
        is_selected,
        student_id,
        quiz_id
    });

    await question.save();

    return question
  }
}

module.exports = QuestionsRepository