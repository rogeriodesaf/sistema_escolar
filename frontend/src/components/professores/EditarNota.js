import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const EditarNota = () => {
    const {  disciplinaId, alunoId } = useParams();
  const { notaId } = useParams();
  const history = useHistory();

  const [novaNota, setNovaNota] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faça a chamada à API no backend para atualizar a nota.
      const response = await fetch(`http://localhost:5000/api/notas/${notaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nota: novaNota }),
      });

      // Verifique se a atualização foi bem-sucedida e, se for o caso, redirecione de volta à página de detalhes do aluno.
      if (response.ok) {
        console.log('disciplinaId:',disciplinaId)
        history.push(`/disciplina/${disciplinaId}/alunos/${alunoId}/detalhes`);
      } else {
        // Caso contrário, exiba uma mensagem de erro ou lide com o erro de acordo com sua lógica.
        console.error('Erro ao atualizar a nota do aluno.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Editar Nota do Aluno</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nova Nota:
          <input type="number" value={novaNota} onChange={(e) => setNovaNota(e.target.value)} />
        </label>
        <button type="submit">Atualizar Nota</button>
      </form>
    </div>
  );
};

export default EditarNota;
