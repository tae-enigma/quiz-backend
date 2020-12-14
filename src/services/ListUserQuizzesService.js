const QuizzesRepository = require('../repositories/QuizzesRepository');
const UsersRespository = require('../repositories/UsersRepository');

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
class ListUserQuizzesService {
  constructor() {
    this.quizzesRepository = new QuizzesRepository();
    this.usersRespository = new UsersRespository();
  }

  /**
   *
   * @param {String} user_id
   * @returns {Promise<Array<Quiz>>}
   */
  async execute(user_id) {
    const user = await this.usersRespository.findById(user_id);

    if (!user) {
      throw new Error('User does not exists');
    }
    let quizzes;

    if (user.type === 'teacher') {
      quizzes = await this.quizzesRepository.findAllByTeacherId(user_id);
    } else {
      quizzes = await this.quizzesRepository.findAllByStudentId(user_id);

      quizzes = quizzes.map(quiz => {
        const { StudentQuizzes: _, User, ...rest } = quiz.get({ plain: true });

        return {
          ...rest,
          teacher_name: User.name,
        };
      });
    }

    return quizzes;
  }
}

module.exports = ListUserQuizzesService;
