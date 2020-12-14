const { Router } = require('express');
const CreateQuizService = require('../services/CreateQuizService');
const AddStudentsToQuizService = require('../services/AddStudentsToQuizService');
const ListUserQuizzesService = require('../services/ListUserQuizzesService');
const ShowFullQuizInformationService = require('../services/ShowFullQuizInformationService');

const quizzesRouter = Router();

quizzesRouter.post('/', async (request, response) => {
  const {
    name,
    time_limit,
    question_qty_limit,
    question_team_qty_limit,
  } = request.body;
  const teacher_id = request.user.id;

  try {
    const createQuiz = new CreateQuizService();

    const quiz = await createQuiz.execute({
      name,
      time_limit,
      question_qty_limit,
      question_team_qty_limit,
      teacher_id,
    });

    return response.json(quiz);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

quizzesRouter.get('/', async (request, response) => {
  const user_id = request.user.id;

  try {
    const listUserQuizzes = new ListUserQuizzesService();

    const quizzes = await listUserQuizzes.execute(user_id);

    return response.json(quizzes);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

quizzesRouter.get('/:quiz_id', async (request, response) => {
  const { quiz_id } = request.params;
  const user_id = request.user.id;

  try {
    const showFullQuizInformation = new ShowFullQuizInformationService();

    const quiz = await showFullQuizInformation.execute({ quiz_id, user_id });

    return response.json(quiz);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

quizzesRouter.post('/:quiz_id/students', async (request, response) => {
  const { quiz_id } = request.params;
  const { students_emails, team } = request.body;

  try {
    const addStudentsToQuizService = new AddStudentsToQuizService();

    const students = await addStudentsToQuizService.execute({
      quiz_id,
      students_emails,
      team,
    });

    return response.json(students);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

module.exports = quizzesRouter;
