const { Router } = require('express');

const ListQuizQuestionsService = require('../services/ListQuizQuestionsService');
const CreateQuestionService = require('../services/CreateQuestionService');

const questionsRouter = Router();

questionsRouter.get('/:quiz_id/questions', async (request, response) => {
  try {
    const { quiz_id } = request.params;
    const { user } = request;

    const listQuizQuestions = new ListQuizQuestionsService();

    const questions = await listQuizQuestions.execute({
      quiz_id,
      user_id: user.id,
    });

    return response.json(questions);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

questionsRouter.post('/:quiz_id/questions', async (request, response) => {
  const { description, options } = request.body;
  const { quiz_id } = request.params;
  const student_id = request.user.id;

  try {
    const createQuestion = new CreateQuestionService();

    const question = await createQuestion.execute({
      description,
      student_id,
      quiz_id,
      options,
    });

    return response.json(question);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

module.exports = questionsRouter;
