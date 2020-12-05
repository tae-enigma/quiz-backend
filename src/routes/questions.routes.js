const {Router} = require('express')
const CreateQuestionService = require('../services/CreateQuestionService')

const questionsRouter = Router()

questionsRouter.post('/', async (request, response) => {
  const { description, team, student_id, quiz_id, options } = request.body

  try {
    const createQuestion = new CreateQuestionService();
    
    const question = await createQuestion.execute({ description, team, student_id, quiz_id, options})

    return response.json(question)
  }
  catch (error) {
    return response.status(400).json({ error: error.message });
  }
})

module.exports = questionsRouter;