const QuestionsRepository = require('../repositories/QuestionsRepository')

/**
 * @typedef { Object } Request
 * @property { string } id
 * @property { string } quiz_id
 */


/**
 * @constructor
 */
class LinkQuestionToQuizService {
  constructor() {
    this.questionsRepository = new QuestionsRepository();
  }

  /**
   * 
   * @param {Request} data
   * @returns {Promise<number>} 
   */
  async execute({id, quiz_id}){
    const result = await this.questionsRepository.linkToQuiz({id, quiz_id})
    
    return result
  }
}

module.exports = LinkQuestionToQuizService;