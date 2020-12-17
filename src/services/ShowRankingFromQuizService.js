const StudentsRepository = require('../repositories/StudentsRepository');
const UsersRepository = require('../repositories/UsersRepository');
const QuizzesRepository = require('../repositories/QuizzesRepository');

class ShowRankingFromQuizService {
  constructor() {
    this.usersRepository = new UsersRepository();
    this.studentsRepository = new StudentsRepository();
    this.quizzesRepository = new QuizzesRepository();
  }

  async execute({ quiz_id, user_id }) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User does not exists');
    }

    const quiz = await this.quizzesRepository.findById(quiz_id);

    if (!quiz) {
      throw new Error('Quiz does not exists');
    }

    const students = await this.studentsRepository.findQuizRankingByQuizId(
      quiz_id,
    );

    const ranking = students.map(s => {
      const student = s.get({ plain: true });

      const result = student.quizzes[0].answers.reduce(
        (curr, answer) => {
          const temp = curr;

          temp.gold += answer.gold;
          temp.xp += answer.xp;

          return temp;
        },
        {
          gold: 0,
          xp: 0,
          total: 0,
        },
      );

      result.total = result.xp * result.gold;

      student.quizzes[0].result = result;

      return student;
    });

    return {
      ranking,
    };
  }
}

/**
 *
 */
module.exports = ShowRankingFromQuizService;
