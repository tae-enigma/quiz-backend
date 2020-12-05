'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      student_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      quiz_id:{
        type: Sequelize.UUID,
        references: {
          model:'quizzes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      description: {
        type: Sequelize.STRING
      },
      team: {
        type: Sequelize.STRING,
      },
      level: {
        type : Sequelize.INTEGER,
        defaultValue: 1
      },
      is_selected: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('questions');
  }
};