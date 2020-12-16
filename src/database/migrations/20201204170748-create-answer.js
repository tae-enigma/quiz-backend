/**
 * @todo Substitute the creation of foreign key by addConstraint function
 *
 * queryInterface.addConstraint('table_name', ['table_column'], {
 *  type: 'FOREIGN KEY',
 *  name: 'foreign_key_name', // useful if using queryInterface.removeConstraint
 *   references: {
 *     table: 'table_reference',
 *     field: 'field_reference',
 *   },
 *   onDelete: 'no action',
 *   onUpdate: 'no action',
 * })
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('answers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      student_id: {
        type: Sequelize.UUID,
        references: {
          model: 'student_quizzes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      option_id: {
        type: Sequelize.UUID,
        name: 'answers_options_fk',
        references: {
          model: 'options',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      gold: {
        type: Sequelize.INTEGER,
      },
      xp: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, _) => {
    await queryInterface.dropTable('answers');
  },
};
