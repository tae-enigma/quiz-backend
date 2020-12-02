const {Router} = require('express')
const CreateQuizService = require('../services/CreateQuizService')

const quizzesRouter = Router()

quizzesRouter.post('/', async (request, response) => {
  /**
   * @todo
   * middleware for id users from request
   */
  const {name, time_limit, question_qty_limit, question_team_qty_limit, teacher_id} = request.body

  try {
    const createQuiz = new CreateQuizService();

    const quiz = await createQuiz.execute({name, time_limit, question_qty_limit, question_team_qty_limit, teacher_id})

    return response.json(quiz)
  }
  catch (error) {
    return response.status(400).json({ error: error.message });
  }
})

module.exports = quizzesRouter