const model = require('../models');
const StudentsRepository = require('../repositories/StudentsRepository');
const UsersRepository = require('../repositories/UsersRepository');

class ShowFullQuizInformationService {
  constructor() {
    this.usersRepository = new UsersRepository();
    this.studentsRepository = new StudentsRepository();
  }

  async execute({ quiz_id, user_id }) {
    const user = await this.usersRepository.findById(user_id);

    let where = {};

    if (!user) {
      throw new Error('User does not exists');
    }

    if (user.type === 'student') {
      const student = await this.studentsRepository.findStudentByUserIdAndQuizId(
        { user_id, quiz_id },
      );

      where = { team: student.StudentQuizzes[0].team };
    }

    const quizInfo = await model.Quiz.findAll({
      where: { id: quiz_id },
      include: [
        {
          model: model.User,
        },
        {
          model: model.Question,
          where,
          include: [
            {
              model: model.Option,
              required: false,
            },
          ],
          required: false,
        },
        {
          model: model.StudentQuiz,
          include: [
            {
              model: model.User,
              required: false,
            },
          ],
        },
      ],
    });

    const { StudentQuizzes, Questions, User, ...quiz } = quizInfo[0].get({
      plain: true,
    });

    const students = StudentQuizzes.map(studentQuiz => {
      return {
        id: studentQuiz.User.id,
        name: studentQuiz.User.name,
        email: studentQuiz.User.email,
        type: studentQuiz.User.type,
        points: studentQuiz.points,
        team: studentQuiz.team,
        quiz_id: studentQuiz.quiz_id,
      };
    });

    const questions = Questions.map(question => {
      const { Options, ...rest } = question;
      return {
        ...rest,
        options: Options,
      };
    });

    return {
      quiz: {
        ...quiz,
        teacher_name: User.name,
      },
      students,
      questions,
    };
  }
}

/**
 *
 */
module.exports = ShowFullQuizInformationService;
