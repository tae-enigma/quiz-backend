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
      this.belongsTo(models.User, { foreignKey: 'teacher_id' });
    }
  };
  quiz.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    time_limit: DataTypes.TIME,
    question_qty_limit: DataTypes.INTEGER,
    question_team_qty_limit: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Quiz',
    tableName: 'quizzes',
  });
  return quiz;
};