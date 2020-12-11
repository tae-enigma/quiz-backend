const model = require('../models')

class ShowQuizService{
  constructor() {
    
  }

  async execute(id) {

    const quiz = await model.Quiz.findAll({
      where: { id: id },
      include: [
        {
          model: model.Question,
          include: [
            {
              model: model.Option, 
              required: false,
            }
          ],
          required: true
        },
        {
          model: model.StudentQuiz,
          include: [
            {
              model: model.User,
              required: false,
            }
          ]
        }

      ]
    });


    return quiz
  }
}

/**
 * 
 */
module.exports = ShowQuizService