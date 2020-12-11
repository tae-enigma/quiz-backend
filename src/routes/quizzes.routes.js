const {Router, request} = require('express')
const CreateQuizService = require('../services/CreateQuizService')
const ShowQuizzesFromTeacher = require('../services/ShowQuizzesFromTeacherService')
const ShowQuizService = require('../services/ShowQuizService')


const quizzesRouter = Router()

quizzesRouter.post('/', async (request, response) => {

  const {name, time_limit, question_qty_limit, question_team_qty_limit} = request.body
  const teacher_id = request.user.id

  try {
    const createQuiz = new CreateQuizService();

    const quiz = await createQuiz.execute({name, time_limit, question_qty_limit, question_team_qty_limit, teacher_id})

    return response.json(quiz)
  }
  catch (error) {
    return response.status(400).json({ error: error.message });
  }
})

quizzesRouter.get('/', async (request, response) => {
  const teacher_id = request.user.id

  try {
    const showQuizzes = new ShowQuizzesFromTeacher()

    const quizzes = await showQuizzes.execute(teacher_id)

    return response.json(quizzes)
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
})


quizzesRouter.get('/:quiz_id', async (request, response) => {
  const {quiz_id} = request.params 

  try {
    const showQuiz = new ShowQuizService()

    const quiz = await showQuiz.execute(quiz_id)

    return response.json(quiz);

  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
})

module.exports = quizzesRouter