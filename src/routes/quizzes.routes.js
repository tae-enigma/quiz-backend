const { Router } = require('express');

const questionsRouter = require('./questions.routes');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const CreateQuizService = require('../services/CreateQuizService');
const AddStudentsToQuizService = require('../services/AddStudentsToQuizService');
const ListUserQuizzesService = require('../services/ListUserQuizzesService');
const ShowQuizInformationsService = require('../services/ShowQuizInformationsService');
const ShowAllStudentsFromQuizService = require('../services/ShowAllStudentsFromQuizService');
const StartQuizService = require('../services/StartQuizService');
const GetStudentQuizReplyService = require('../services/GetStudentQuizReplyService');
const AnswerQuestionService = require('../services/AnswerQuestionService');
const ListStudentAnswersService = require('../services/ListStudentAnswersService');

const quizzesRouter = Router();

quizzesRouter.use(ensureAuthenticated);

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
    const showQuizInformationsService = new ShowQuizInformationsService();

    const quiz = await showQuizInformationsService.execute({
      quiz_id,
      user_id,
    });

    return response.json(quiz);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

quizzesRouter.get('/:quiz_id/students', async (request, response) => {
  const { quiz_id } = request.params;
  const user_id = request.user.id;

  try {
    const showAllStudentsFromQuiz = new ShowAllStudentsFromQuizService();

    const students = await showAllStudentsFromQuiz.execute({
      quiz_id,
      user_id,
    });

    return response.json(students);
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

quizzesRouter.patch('/:quiz_id/start', async (request, response) => {
  const { quiz_id } = request.params;
  try {
    const startQuizService = new StartQuizService();
    const result = await startQuizService.execute(quiz_id);

    return response.json(result);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

quizzesRouter.get('/:quiz_id/reply', async (request, response) => {
  try {
    const { quiz_id } = request.params;
    const { user } = request;

    const getStudentQuizReply = new GetStudentQuizReplyService();

    const quizRepy = await getStudentQuizReply.execute({
      quiz_id,
      user_id: user.id,
    });
    return response.json(quizRepy);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

quizzesRouter.post('/:quiz_id/answer', async (request, response) => {
  try {
    const { quiz_id } = request.params;
    const { user } = request;
    const { option_id } = request.body;

    const answerQuestionService = new AnswerQuestionService();

    const quizRepy = await answerQuestionService.execute({
      quiz_id,
      user_id: user.id,
      option_id,
    });
    return response.json(quizRepy);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

quizzesRouter.get('/:quiz_id/answer', async (request, response) => {
  try {
    const { quiz_id } = request.params;
    const { user } = request;

    const listStudentAnswers = new ListStudentAnswersService();

    const answers = await listStudentAnswers.execute({
      quiz_id,
      user_id: user.id,
    });
    return response.json(answers);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

quizzesRouter.use('/', questionsRouter);

module.exports = quizzesRouter;
