const { Router } = require('express');
const usersRouter = require('./users.routes');
const sessionsRouter = require('./sessions.routes');
const quizzesRouter = require('./quizzes.routes');
const studentQuizzesRouter = require('./studentQuizzes.routes');
const questionsRouter = require('./questions.routes');
const questionsQuizzesRouter = require('./questionsQuizzes.routes');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const routes = Router();

// routes.use('/', (request, response) => {
//   response.send('its worked')
// })

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/quizzes', ensureAuthenticated, quizzesRouter);
routes.use('/quizzes/students', studentQuizzesRouter);
routes.use('/questions', ensureAuthenticated, questionsRouter);
routes.use('/quizzes/questions', questionsQuizzesRouter);

module.exports = routes;
