const StudentsRepository = require('../repositories/StudentsRepository');
const UsersRepository = require('../repositories/UsersRepository');
const QuestionsRepository = require('../repositories/QuestionsRepository');

class ListQuizQuestionsService {
  constructor() {
    this.usersRepository = new UsersRepository();
    this.studentsRepository = new StudentsRepository();
    this.questionsRepository = new QuestionsRepository();
  }

  async execute({ quiz_id, user_id }) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User does not exists');
    }

    let questions = [];

    if (user.type === 'student') {
      const student = await this.studentsRepository.findStudentByUserIdAndQuizId(
        { user_id, quiz_id },
      );

      questions = await this.questionsRepository.findAllByQuizIdAndStudentTeam({
        quiz_id,
        team: student.StudentQuizzes[0].team,
      });
    } else {
      questions = await this.questionsRepository.findAllByQuizId(quiz_id);
    }
    return questions;
  }
}

module.exports = ListQuizQuestionsService;
