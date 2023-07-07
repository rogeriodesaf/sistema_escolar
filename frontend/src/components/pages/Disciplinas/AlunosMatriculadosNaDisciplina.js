import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AlunosMatriculados = () => {
  const { disciplinaId } = useParams();
  const [alunos, setAlunos] = useState([]);
  const [contagemPresencasFaltas, setContagemPresencasFaltas] = useState({});

  useEffect(() => {
    const fetchAlunosMatriculados = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/disciplinas/${disciplinaId}/alunos`);
        const data = await response.json();
        setAlunos(data.alunos);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchContagemPresencasFaltas = async (alunoId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/alunos/${alunoId}/disciplinas/${disciplinaId}/presencas`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    const fetchContagemPresencasFaltasForAllAlunos = async () => {
      const results = await Promise.all(alunos.map((aluno) => fetchContagemPresencasFaltas(aluno._id)));
      const contagemPresencasFaltas = results.reduce((acc, data, index) => {
        acc[alunos[index]._id] = data;
        return acc;
      }, {});
      setContagemPresencasFaltas(contagemPresencasFaltas);
    };

    fetchAlunosMatriculados();
    fetchContagemPresencasFaltasForAllAlunos();
  }, [disciplinaId, alunos]);

  return (
    <div>
      <h1>Alunos Matriculados na Disciplina</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Presenças</th>
            <th>Faltas</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno._id}>
              <td>{aluno.firstName}</td>
              <td>{aluno.lastName}</td>
              <td>{contagemPresencasFaltas[aluno._id] && contagemPresencasFaltas[aluno._id].contadorPresencas ? contagemPresencasFaltas[aluno._id].contadorPresencas : 0}</td>
              <td>{contagemPresencasFaltas[aluno._id] && contagemPresencasFaltas[aluno._id].contadorFaltas ? contagemPresencasFaltas[aluno._id].contadorFaltas : 0}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlunosMatriculados;
