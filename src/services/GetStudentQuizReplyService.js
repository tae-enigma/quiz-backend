const StudentsRepository = require('../repositories/StudentsRepository');
const QuizzesRepository = require('../repositories/QuizzesRepository');
const AnswersRepository = require('../repositories/AnswersRepository');
const { STARTED, getQuizStatusByStartTime } = require('../utils/quizStatus');
const QuestionsRepository = require('../repositories/QuestionsRepository');

class GetStudentQuizReplyService {
  constructor() {
    this.studentsRepository = new StudentsRepository();
    this.quizzesRepository = new QuizzesRepository();
    this.questionsRepository = new QuestionsRepository();
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

    const quizStatus = getQuizStatusByStartTime({
      start_time: quiz.start,
      time_limit: quiz.time_limit,
    });

    if (quizStatus !== STARTED) {
      throw new Error('Quiz is not open to replies');
    }

    const adversaryTeam = user.quizzes[0].team === 'dire' ? 'radiant' : 'dire';

    const questions = await this.questionsRepository.findSelectedQuestionsByQuizIdAndStudentsTeam(
      { quiz_id, team: adversaryTeam },
    );

    const answers = await this.answersRepository.findallByStudentId(
      user.quizzes[0].id,
    );

    const formatedQuestions = questions.map(q => {
      const question = q.get({ plain: true });

      const answered = answers.find(
        answer => answer.option.question_id === question.id,
      );

      return {
        ...question,
        answered: !!answered,
      };
    });

    return {
      quiz,
      questions: formatedQuestions,
    };
  }
}

module.exports = GetStudentQuizReplyService;
