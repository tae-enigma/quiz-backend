module.exports = {
  development: {
    username: 'mich',
    password: 'admin',
    database: 'tae_quiz',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: 'tae_quiz_test',
    host: process.env.HOST_DB,
    dialect: 'mysql',
  },
  production: {
    username: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: 'tae_quiz_production',
    host: process.env.HOST_DB,
    dialect: 'mysql',
  },
};
