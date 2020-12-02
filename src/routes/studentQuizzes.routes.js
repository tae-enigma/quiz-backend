const { Router } = require('express')
const LinkStudentToQuizService = require('../services/LinkStudentToQuizService')

const linkStudentRouter = Router()

linkStudentRouter.post('/', async (request, response)=> {
  const {quiz_id ,emails, name_team} = request.body

  try {
    const linkStudentToQuiz = new LinkStudentToQuizService();

    const studentsQuiz = await linkStudentToQuiz.execute(quiz_id, emails, name_team)

    return response.json(studentsQuiz)
    
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }

})

module.exports = linkStudentRouter