'use strict';
const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class question extends Model {
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
  question.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    team: DataTypes.STRING,
    level: DataTypes.INTEGER,
    is_selected: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Question',
    tableName: 'questions',
  });
  return question;
};