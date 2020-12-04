const { Question } = require('../models')

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
  async create({description, team, level, is_selected, student_id, quiz_id}){
    const question = Question.build({
      description,  
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