const { millisecondsToTimeString } = require('../utils/formatTime');
const { getQuizStatusByStartTime } = require('../utils/quizStatus');

const StudentsRepository = require('../repositories/StudentsRepository');
const UsersRepository = require('../repositories/UsersRepository');
const QuizzesRepository = require('../repositories/QuizzesRepository');

class ShowFullQuizInformationService {
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

    const formated_time_limit = millisecondsToTimeString(quiz.time_limit);

    const status = getQuizStatusByStartTime({
      start_time: quiz.start,
      time_limit: quiz.time_limit,
    });

    return {
      ...quiz.get({ plain: true }),
      formated_time_limit,
      status,
    };
  }
}

/**
 *
 */
module.exports = ShowFullQuizInformationService;
