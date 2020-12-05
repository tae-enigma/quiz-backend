const { sequelize } = require('../models')
const QuestionsRepository = require('../repositories/QuestionsRepository')
const OptionsRepository = require('../repositories/OptionsRepository')
const AnswersRepository = require('../repositories/AnswersRepository');

/**
 * @typedef { Object } Request
 * @property { text } description
 * @property { string } team
 * @property { string} student_id
 * @property { string } quiz_id
 * @property { Array } options
 */

/**
* @typedef { Object } Question
*  @property { string } id
* @property { text } description
* @property { string } team
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
    this.optionsRepository = new OptionsRepository();
    this.answersRepository = new AnswersRepository();
  }

  /**
   * 
   * @param {Request} data
   * @returns {Promise<Question>} 
   */
  async execute({ description, team, student_id, quiz_id, options }) {

    const result = sequelize.transaction(async t => {

      const question = await this.questionsRepository.create({
        description,
        team,
        student_id,
        quiz_id
      }, t)

      options.forEach(value => {
        value.question_id = question.id
      })

      const result = await this.optionsRepository.create(options, t)

      return { question, options: result }
    })


    return result
  }
}

module.exports = CreateQuestionService