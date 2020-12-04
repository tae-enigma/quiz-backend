const QuestionsRepository = require('../repositories/QuestionsRepository')

/**
 * @typedef { Object } Request
 * @property { text } description
 * @property { string } team
 * @property { number } level
 * @property { boolean } is_selected
 * @property { string} student_id
 * @property { string } quiz_id
 */

 /**
 * @typedef { Object } Question
 *  @property { string } id
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
 * Instance a CreateQuestionService
 * @constructor
 */
class CreateQuestionService {
  constructor() {
    this.questionsRepository = new QuestionsRepository();
  }

  /**
   * 
   * @param {Request} data
   * @returns {Promise<Question>} 
   */
  async execute({ description, team, level, is_selected, student_id, quiz_id }){
    const question = await this.questionsRepository.create({
      description,
      team,
      level,
      is_selected,
      student_id,
      quiz_id
    })
    return question
  }
}

module.exports = CreateQuestionService