const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, _) => {
    queryInterface.changeColumn('options', 'description', {
      type: DataTypes.TEXT,
      allowNull: false,
    });
  },

  down: async (queryInterface, _) => {
    queryInterface.changeColumn('options', 'description', {
      type: DataTypes.STRING,
    });
  },
};
