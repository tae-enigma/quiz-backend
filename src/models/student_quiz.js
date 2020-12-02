'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: 'student_id'})
      this.belongsTo(models.Quiz, {foreignKey: 'quiz_id'})
    }
  };
  student_quiz.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    points: {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    },
    team : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StudentQuiz',
    tableName: 'student_quizzes',
  });
  return student_quiz;
};