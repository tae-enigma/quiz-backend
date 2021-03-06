const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, _) => {
    await queryInterface.changeColumn('questions', 'description', {
      type: DataTypes.TEXT,
      allowNull: false,
    });
  },

  down: async (queryInterface, _) => {
    await queryInterface.changeColumn('questions', 'description', {
      type: DataTypes.STRING,
    });
  },
};
