const StudentQuizzesRepository = require('../repositories/StudentQuizzesRepository');
const UsersRepository = require('../repositories/UsersRepository');

/**
 * @typedef { Object } Request
 * @property { array } emails
 * @property { string } name_team
 */

/**
 * @typedef { Object } StudentQuiz
 * @property { string } id
 * @property { string } student_id
 * @property { string } quiz_id
 * @property { number } points
 * @property { string } team
 * @property { Date } createdAt
 * @property { Date } updatedAt
 */

/**
 * Instance a LinkStudentToQuiz
 * @constructor
 */
class LinkStudentToQuiz {
  constructor() {
    this.studentQuizzesRepository = new StudentQuizzesRepository();
    this.usersRepository = new UsersRepository();
  }

  /**
   * @param {Request} data
   * @returns {Promise<StudentQuiz>}
   */
  async execute(quiz_id, emails, team) {
    if (team !== 'dire' && team !== 'radiant') {
      throw new Error('Invalid team name');
    }
    if (emails.length <= 0 || quiz_id === undefined) {
      throw new Error('Invalid fields');
    }

    const promisseAll = [];
    for (let index = 0; index < emails.length; index++) {
      const checkUserExists = await this.usersRepository.findByEmail(
        emails[index],
      );

      if (checkUserExists && checkUserExists.type === 'student') {
        const student_quiz = {
          student_id: checkUserExists.id,
          quiz_id,
          team,
        };
        promisseAll.push(student_quiz);
      }
    }

    const student_quizzes = await Promise.all(promisseAll);

    const studentQuiz = this.studentQuizzesRepository.create(student_quizzes);
    return studentQuiz;
  }
}

module.exports = LinkStudentToQuiz;
