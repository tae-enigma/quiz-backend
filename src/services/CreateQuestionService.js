const { sequelize } = require('../models');
const QuestionsRepository = require('../repositories/QuestionsRepository');
const OptionsRepository = require('../repositories/OptionsRepository');
const StudentsRepository = require('../repositories/StudentsRepository');

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
    this.studentsRepository = new StudentsRepository();
  }

  /**
   *
   * @param {Request} data
   * @returns {Promise<Question>}
   */
  async execute({ description, student_id, quiz_id, options }) {
    const user = await this.studentsRepository.findStudentByUserIdAndQuizId({
      user_id: student_id,
      quiz_id,
    });

    if (!user) {
      throw new Error('Student not found');
    }

    if (user.type !== 'student') {
      throw new Error('Only students can create questions');
    }

    const result = sequelize.transaction(async t => {
      const question = await this.questionsRepository.create(
        {
          description,
          team: user.StudentQuizzes[0].team,
          student_id,
          quiz_id,
        },
        t,
      );

      const formatedOptions = options.map(option => {
        return {
          ...option,
          question_id: question.id,
        };
      });

      const createdOptions = await this.optionsRepository.create(
        formatedOptions,
        t,
      );

      return { question, options: createdOptions };
    });

    return result;
  }
}

module.exports = CreateQuestionService;
