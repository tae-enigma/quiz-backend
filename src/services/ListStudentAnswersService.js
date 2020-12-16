const StudentsRepository = require('../repositories/StudentsRepository');
const QuizzesRepository = require('../repositories/QuizzesRepository');
const AnswersRepository = require('../repositories/AnswersRepository');

class ListStudentAnswersService {
  constructor() {
    this.studentsRepository = new StudentsRepository();
    this.quizzesRepository = new QuizzesRepository();
    this.answersRepository = new AnswersRepository();
  }

  async execute({ quiz_id, user_id }) {
    const user = await this.studentsRepository.findStudentByUserIdAndQuizId({
      quiz_id,
      user_id,
    });

    if (!user) {
      throw new Error('User does not exists');
    }

    if (user.type !== 'student') {
      throw new Error('You need to be a student to reply a quiz');
    }

    const quiz = await this.quizzesRepository.findById(quiz_id);

    if (!quiz) {
      throw new Error('This quiz does not exists');
    }

    const student_id = user.quizzes[0].id;

    const answers = await this.answersRepository.findallByStudentId(student_id);

    const result = answers.reduce(
      (acc, curr) => {
        acc.gold += curr.gold;
        acc.xp += curr.xp;

        return acc;
      },
      {
        gold: 0,
        xp: 0,
      },
    );

    result.total = result.xp * result.gold;

    return {
      result,
      answers,
    };
  }
}

module.exports = ListStudentAnswersService;
