import React from 'react';
import ProfessorDisciplinaForm from '../forms/ProfessorDisciplinaForm';
import api from '../../utils/api' // Importe a instância do Axios configurada com a URL base

function AdicionarProfessorNaDisciplina() {
  const handleFormSubmit = async (dados) => {
    const { disciplinaId, professorId } = dados;

    try {
      // Fazer a requisição para o backend para associar o professor com a disciplina
      const response = await api.post(`/api/disciplinas/${disciplinaId}/professores/${professorId}`);

      // Verificar se a requisição foi bem-sucedida
      if (response.status === 200) {
        console.log('Professor adicionado à disciplina com sucesso');
        // Lógica adicional, como exibir uma mensagem de sucesso ou redirecionar para outra página
      } else {
        console.log('Erro ao adicionar professor à disciplina');
        // Lógica adicional, como exibir uma mensagem de erro
      }
    } catch (error) {
      console.log('Erro ao adicionar professor à disciplina:', error);
      // Lógica adicional, como exibir uma mensagem de erro
    }
  };

  return (
    <div>
      <h1>Adicionar Professor na Disciplina</h1>
      <ProfessorDisciplinaForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default AdicionarProfessorNaDisciplina;
