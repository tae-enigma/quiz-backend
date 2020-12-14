const model = require('../models');

class ShowQuizService {
  async execute(quiz_id) {
    const quizInfo = await model.Quiz.findAll({
      where: { id: quiz_id },
      include: [
        {
          model: model.User,
        },
        {
          model: model.Question,
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
module.exports = ShowQuizService;
