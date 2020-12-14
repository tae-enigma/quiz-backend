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

    return quiz;
  }
}

/**
 *
 */
module.exports = ShowFullQuizInformationService;
