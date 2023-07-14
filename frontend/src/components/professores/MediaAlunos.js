import axios from 'axios';

const buscarMediaAluno = async (alunoId, disciplinaId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/notas/alunos/${alunoId}/disciplinas/${disciplinaId}/media`
    );
    const media = response.data.media;
    console.log('Média do aluno:', media);
    // Faça o que for necessário com a média do aluno (exibir na interface, etc.)
  } catch (error) {
    console.error('Erro ao buscar a média do aluno:', error);
  }
};

export default buscarMediaAluno;
