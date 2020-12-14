const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Question, { foreignKey: 'student_id' });
      this.hasMany(models.Quiz, { foreignKey: 'teacher_id' });
      this.hasMany(models.StudentQuiz, {
        foreignKey: 'student_id',
        as: 'quizzes',
      });
      this.hasMany(models.Answer, { foreignKey: 'student_id' });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    },
  );
  return User;
};
