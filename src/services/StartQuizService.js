const QuizzesRepository = require('../repositories/QuizzesRepository');
const {
  getQuizStatusByStartTime,
  NOT_STARTED,
  STARTED,
} = require('../utils/quizStatus');

const formatTime = require('../utils/formatTime');

class StartQuizService {
  constructor() {
    this.quizzesRepository = new QuizzesRepository();
  }

  async execute(quiz_id) {
    const quiz = await this.quizzesRepository.findById(quiz_id);

    const date_time = new Date();

    let status = getQuizStatusByStartTime({
      time_limit: quiz.time_limit,
      start_time: quiz.start,
    });

    if (status !== NOT_STARTED) {
      throw new Error(`This quiz is already ${status}`);
    }

    const result = await this.quizzesRepository.updateStartQuiz({
      quiz_id,
      date_time,
    });

    if (!result) {
      throw new Error('Sorry! We cannot start this quiz');
    }

    quiz.start = date_time;
    const formated_time_limit = formatTime.millisecondsToTimeString(
      quiz.time_limit,
    );
    status = STARTED;

    return { ...quiz.get({ plain: true }), formated_time_limit, status };
  }
}

module.exports = StartQuizService;
