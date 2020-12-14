const QuizzesRepository = require('../repositories/QuizzesRepository')

class StartQuizService {
  constructor(){
    this.quizzesRepository = new QuizzesRepository()
  }

  async execute(quiz_id){
    const date_time = new Date()

    const result = await this.quizzesRepository.updateStartQuiz({quiz_id,date_time})

    if(!result){
      throw new Error('update error start quiz for parsed id.')
    }

    const quiz = await this.quizzesRepository.findById(quiz_id)

    return quiz
  }
}

module.exports = StartQuizService
