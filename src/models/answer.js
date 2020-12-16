const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.StudentQuiz, {
        foreignKey: 'student_id',
        as: 'student',
      });
      this.belongsTo(models.Option, { foreignKey: 'option_id', as: 'option' });
    }
  }
  answer.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      xp: {
        type: DataTypes.INTEGER,
      },
      gold: {
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Answer',
      tableName: 'answers',
    },
  );
  return answer;
};
