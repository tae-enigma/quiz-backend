const student_quiz = require('../models/student_quiz');
const StudentQuizzesRepository = require('../repositories/StudentQuizzesRepository')
const UsersRepository = require('../repositories/UsersRepository');

/**
 * @typedef { Object } Request
 * @property { array } emails
 * @property { string } name_team
 */

/**
 * @typedef { Object } StudentQuiz
 * @property { string } id
 * @property { string } student_id
 * @property { string } quiz_id
 * @property { number } points
 * @property { string } team
 * @property { Date } createdAt
 * @property { Date } updatedAt
 */

/**
 * Instance a LinkStudentToQuiz
 * @constructor
 */
class LinkStudentToQuiz {
  constructor() {
    this.studentQuizzesRepository = new StudentQuizzesRepository();
    this.usersRepository = new UsersRepository();
  }

  /**
   * 
   * @param {Request} data
   * @returns {Promise<StudentQuiz>} 
   */
  async execute(quiz_id, emails, name_team){

    if(name_team !== 'Temidos' && name_team !== 'Iluminados'){
      throw new Error('Invalid name team')
    }
    if(emails.length <= 0 || quiz_id === undefined){
      throw new Error('Invalid filds')
    }
    
    const promisseAll = []
    for (let index = 0; index < emails.length; index++) {
      const checkUserExists = await this.usersRepository.findByEmail(emails[index]);
      
      
      if(checkUserExists){
        const student_quiz = { student_id:checkUserExists.id, quiz_id, team:name_team }
        promisseAll.push(student_quiz)
      }
    }
    
    const student_quizzes = await Promise.all(promisseAll)
    console.log(student_quizzes)
    const studentQuiz = this.studentQuizzesRepository.create(student_quizzes)
    return studentQuiz
  }
}

module.exports = LinkStudentToQuiz