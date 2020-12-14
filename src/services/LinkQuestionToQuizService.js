const QuestionsRepository = require('../repositories/QuestionsRepository');

/**
 * @typedef { Object } Request
 * @property { string } question_id
 * @property { 1 | 2 } level
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
  async execute({ question_id, level }) {
    const question = await this.questionsRepository.findById(question_id);

    question.is_selected = true;
    question.level = level;

    await this.questionsRepository.save(question);

    return question;
  }
}

module.exports = LinkQuestionToQuizService;
