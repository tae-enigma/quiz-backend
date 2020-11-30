'use strict';
const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user)
    }
  };
  quiz.init({
    name: DataTypes.STRING,
    time_limit: DataTypes.TIME,
    question_qty_limit: DataTypes.NUMBER,
    question_team_qty_limit: DataTypes.NUMBER,
  }, {
    sequelize,
    modelName: 'quiz',
    tableName: 'quizzes',
  });
  return quiz;
};