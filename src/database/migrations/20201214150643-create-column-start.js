'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('quizzes', 'start', {
      type: Sequelize.DataTypes.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('quizzes', 'start');
  }
};
