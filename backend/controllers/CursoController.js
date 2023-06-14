module.exports = class CursoController {
    static async listarCursos(req, res) {
      try {
        // Lógica para listar os cursos
        const cursos = await Curso.find();
        res.json(cursos);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao listar os cursos' });
      }
    }
  
    static async obterCurso(req, res) {
      try {
        // Lógica para obter um curso pelo ID
        const curso = await Curso.findById(req.params.id);
        res.json(curso);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao obter o curso' });
      }
    }
  
    // Outros métodos do controller de cursos
  }
  
 
  