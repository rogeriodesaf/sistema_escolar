


const authorizationLevels = {
    professor: ['viewStudents', 'gradeStudents','lancarNotas'],
    coordenador: ['viewStudents', 'gradeStudents', 'manageTasks','createDisciplinas','lancarNotas','associaProfessorDisciplina'],
    Diretor: ['viewStudents', 'gradeStudents', 'manageTasks', 'manageCourses','createDisciplinas','lancarNotas']
  };
  
  module.exports = authorizationLevels;
  




  
 