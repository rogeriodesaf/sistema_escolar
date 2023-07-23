import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import DetalhesAluno from '../alunos/DetalhesAluno';



const MediaAlunos = ({ disciplinaId }) => {
  const [notas, setNotas] = useState([]);


  useEffect(() => {
    // Função para buscar as notas dos alunos na disciplina específica
    const fetchNotas = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/notas/disciplina/${disciplinaId}`);
        const data = await response.json();
        setNotas(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotas();
  }, [disciplinaId]);

  // Verifica se o array de notas não está vazio
  if (notas.length === 0) {
    return <p>Nenhuma nota encontrada para esta disciplina.</p>;
  }

  // Função para calcular a média do aluno com base nas notas
  const calcularMedia = (notasAluno) => {
    if (notasAluno.length === 0) {
      return 0;
    }

    const somaNotas = notasAluno.reduce((total, nota) => total + nota.nota, 0);
    const media = somaNotas / notasAluno.length;
    return media;
  };

  // Filtra as notas por aluno e calcula a média para cada aluno
  const alunosComMedia = notas.reduce((alunos, nota) => {
    const alunoExistente = alunos.find((aluno) => aluno.aluno === nota.aluno);
    if (alunoExistente) {
      alunoExistente.notas.push(nota);
    } else {
      alunos.push({
        alunoId: nota.alunoId, // Inclui o id do aluno associado à nota
        aluno: nota.aluno,
        disciplinaId: nota.disciplinaId,
        notas: [nota],
      
      });
      console.log('alunosCOmmmedia',alunos)
    }
   
    return alunos;
  }, []);

  // Calcula a média para cada aluno e atualiza a propriedade 'media'
  alunosComMedia.forEach((alunoComMedia) => {
    alunoComMedia.media = calcularMedia(alunoComMedia.notas);
  });

  // Renderiza a tabela com as médias dos alunos
  return (
    <div>
      <h1>Médias dos Alunos</h1>
      <table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Média</th>
          
          </tr>
        </thead>
        <tbody>
          {alunosComMedia.map((alunoComMedia) => (
            <tr key={alunoComMedia.aluno}>
              <td>
              <Link to={`/disciplina/${alunoComMedia.disciplinaId}/alunos/${alunoComMedia.alunoId}/detalhes`}>
                  {alunoComMedia.aluno} {/* Supondo que o nome do aluno esteja em 'firstName' */}
                </Link></td>
              <td>{alunoComMedia.media.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* Link para retornar à página de médias dos alunos */}
       <Link to={`/disciplinas/professor`}>
        Voltar 
      </Link>
    </div>
  );
};

export default MediaAlunos;
