const QuizzesRepository = require('../repositories/QuizzesRepository')
const StatusQuiz = require('../utils/statusQuiz')

const formatTime = require('../utils/formatTime')

class StartQuizService {
  constructor(){
    this.quizzesRepository = new QuizzesRepository()
  }

  async execute(quiz_id){

    const quiz = await this.quizzesRepository.findById(quiz_id)

    const date_time = new Date()

    let status = StatusQuiz.getQuizStatusByStart(quiz.time_limit, date_time, quiz.start)

    if(status !== StatusQuiz.NOT_STARTED){
      throw new Error(`Quiz is already ${status}`)
    }

    const result = await this.quizzesRepository.updateStartQuiz({quiz_id,date_time})

    if(!result){
      throw new Error('update error start quiz for parsed id.')
    }


    quiz.start = date_time
    const formated_time_limit = formatTime.millisecondsToTimeString(quiz.time_limit)
    status = StatusQuiz.STARTED

    return {...quiz.get({plain:true}), formated_time_limit, status}
  }
}

module.exports = StartQuizService
