const QuizzesRepository = require('../repositories/QuizzesRepository');
const UsersRepository = require('../repositories/UsersRepository');
const formatTime = require('../utils/formatTime');

/**
 * @typedef { Object } Request
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

/**
 * Instance a CreateQuizService
 * @constructor
 */
class CreateQuizService {
  constructor() {
    this.quizzesRepository = new QuizzesRepository();
    this.usersRepository = new UsersRepository();
  }

  /**
   *
   * @param {Request} data
   * @returns {Promise<Quiz>}
   */
  async execute({
    name,
    time_limit,
    question_qty_limit,
    question_team_qty_limit,
    teacher_id,
  }) {
    const teacher = await this.usersRepository.findById(teacher_id);

    if (!teacher || teacher.type !== 'teacher') {
      throw new Error('Teacher with this id does not exists');
    }

    const milliseconds = formatTime.timeStringToMilliseconds(time_limit);

    const quiz = await this.quizzesRepository.create({
      name,
      time_limit: milliseconds,
      question_qty_limit,
      question_team_qty_limit,
      teacher_id,
    });
    return {
      ...quiz.get({ plain: true }),
      teacher,
    };
  }
}

module.exports = CreateQuizService;
