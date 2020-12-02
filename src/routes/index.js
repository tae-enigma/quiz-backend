const { Router } = require('express');
const usersRouter = require('./users.routes');
const sessionsRouter = require('./sessions.routes');
const quizzesRouter = require('../routes/quizzes.routes');
const studentQuizzesRouter = require('./studentQuizzes.routes');

const routes = Router();

// routes.use('/', (request, response) => {
//   response.send('its worked')
// })

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/quizzes', quizzesRouter);
routes.use('/quizzes/students', studentQuizzesRouter);

module.exports = routes;
