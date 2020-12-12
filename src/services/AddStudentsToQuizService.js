const UsersRepository = require('../repositories/UsersRepository');
const StudentsRepository = require('../repositories/StudentsRepository');

class AddStudentsToQuizService {
  constructor() {
    this.usersRepository = new UsersRepository();
    this.studentsRepository = new StudentsRepository();
  }

  async execute({ quiz_id, students_emails, team }) {
    if (team !== 'dire' && team !== 'radiant') {
      throw new Error('Invalid team name');
    }

    const students = await this.usersRepository.findAllStudentsByEmails(
      students_emails,
    );

    const quiz_students = await this.studentsRepository.findAllStudentsByQuizId(
      quiz_id,
    );

    const new_students = students.reduce((acc, current) => {
      const student = current.get({ plain: true });

      const isStudentInQuiz = quiz_students.find(
        quiz_student => quiz_student.User.id === student.id,
      );

      if (isStudentInQuiz) return acc;

      acc.push({
        student_id: student.id,
        quiz_id,
        team,
      });

      return acc;
    }, []);

    const student_quizzes = await this.studentsRepository.createMany(
      new_students,
    );

    const students_ids = student_quizzes.map(student => student.id);

    const created_students = await this.studentsRepository.findAllByStudentsIdFromQuiz(
      students_ids,
      quiz_id,
    );

    return created_students.map(created_student => {
      return {
        id: created_student.User.id,
        name: created_student.User.name,
        email: created_student.User.email,
        type: created_student.User.type,
        points: created_student.points,
        team: created_student.team,
        quiz_id: created_student.quiz_id,
      };
    });
  }
}

module.exports = AddStudentsToQuizService;
