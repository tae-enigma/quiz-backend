const { Router } = require('express');
const usersRouter = require('./users.routes');
const sessionsRouter = require('./sessions.routes');
const quizzesRouter = require('./quizzes.routes');
const studentQuizzesRouter = require('./studentQuizzes.routes');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const routes = Router();

routes.get('/', (req, res) =>{
  res.send('backend its work!')
})

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/quizzes', ensureAuthenticated, quizzesRouter);
routes.use('/quizzes/students', studentQuizzesRouter);

module.exports = routes;
