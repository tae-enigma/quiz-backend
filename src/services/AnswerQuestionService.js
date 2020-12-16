const StudentsRepository = require('../repositories/StudentsRepository');
const QuizzesRepository = require('../repositories/QuizzesRepository');
const { STARTED, getQuizStatusByStartTime } = require('../utils/quizStatus');
const QuestionsRepository = require('../repositories/QuestionsRepository');
const OptionsRepository = require('../repositories/OptionsRepository');
const AnswersRepository = require('../repositories/AnswersRepository');

class AnswerQuestionService {
  constructor() {
    this.studentsRepository = new StudentsRepository();
    this.quizzesRepository = new QuizzesRepository();
    this.questionsRepository = new QuestionsRepository();
    this.optionsRepository = new OptionsRepository();
    this.answersRepository = new AnswersRepository();
  }

  async execute({ quiz_id, option_id, user_id }) {
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
      throw new Error('Quiz is not longer open to replies');
    }

    const option = await this.optionsRepository.findById(option_id);

    if (!option) {
      throw new Error('It is not a valid option');
    }

    const question = await this.questionsRepository.findById(
      option.question_id,
    );

    const type = option.is_correct ? 'hit' : 'miss';

    let gold;
    let xp;

    if (type === 'hit') {
      gold = 10;
      xp = question.level === 1 ? 5 : 10;
    } else {
      gold = 5;
      xp = 0;
    }

    const answer = await this.answersRepository.create({
      option_id,
      student_id: user.quizzes[0].id,
      type,
      gold,
      xp,
    });

    return answer;
  }
}

module.exports = AnswerQuestionService;
