const StudentsRepository = require('../repositories/StudentsRepository');

class ShowAllStudentsFromQuizService {
  constructor() {
    this.studentsRepository = new StudentsRepository();
  }

  async execute({ quiz_id, user_id }) {
    const students = await this.studentsRepository.findAllStudentsByQuizId(
      quiz_id,
    );

    return students;
  }
}

module.exports = ShowAllStudentsFromQuizService;
