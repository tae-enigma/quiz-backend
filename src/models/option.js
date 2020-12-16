const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Answer, { foreignKey: 'option_id' });
      this.belongsTo(models.Question, {
        foreignKey: 'question_id',
        as: 'question',
      });
    }
  }
  option.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      is_correct: DataTypes.BOOLEAN,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Option',
      tableName: 'options',
    },
  );
  return option;
};
