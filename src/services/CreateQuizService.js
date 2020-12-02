const QuizzesRepository = require('../repositories/QuizzesRepository')

/**
 * @typedef { Object } Request
 * @property { string } name
 * @property { date } time_limit
 * @property { number } question_qty_limit
 * @property { number } question_team_qty_limit
 * @property { string } teacher_id
 */

 /**
 * @typedef { Object } Quiz
 *  @property { string } id
 * @property { string } name
 * @property { date } time_limit
 * @property { number } question_qty_limit
 * @property { number } question_team_qty_limit
 * @property { string } teacher_id
 * @property { Date } createdAt
 * @property { Date } updatedAt
 */

class CreateQuizService {
  constructor() {
    this.quizzesRepository = new QuizzesRepository();
  }

  async execute({name, time_limit, question_qty_limit, question_team_qty_limit, teacher_id}){
    const quiz = await this.quizzesRepository.create({
      name,
      time_limit,
      question_qty_limit,
      question_team_qty_limit,
      teacher_id
    })
    return quiz
  }
}

module.exports = CreateQuizService