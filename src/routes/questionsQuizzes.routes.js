const { Router } = require('express')
const LinkQuestionToQuizService = require('../services/LinkQuestionToQuizService')

const linkQuestionRouter = Router()

linkQuestionRouter.post('/:id', async (request, response) => {
  const { quiz_id } = request.body
  const { id } = request.params

  try {
    const linkQuestionToQuizService = new LinkQuestionToQuizService();

    const questionQuizResult = await linkQuestionToQuizService.execute({ id, quiz_id })

    response.status(204)

  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

module.exports = linkQuestionRouter