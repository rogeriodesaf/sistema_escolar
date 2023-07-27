import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TodasDisciplinasAluno = () => {
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    // Função para buscar todas as disciplinas no backend
    const fetchDisciplinas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/disciplinas/disciplinas/listar');
        const data = await response.json();
        setDisciplinas(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDisciplinas();
  }, []);

  return (
    <div>
      <h2>Todas as Disciplinas</h2>
      <table>
        <thead>
          <tr>
            <th>Disciplina</th>
            <th>Descrição</th>
            <th>Créditos</th>
            <th>Carga Horária</th>
          </tr>
        </thead>
        <tbody>
          {disciplinas.map((disciplina) => (
            <tr key={disciplina._id}>
              <td>
                <Link
                  to={`/disciplinas/${disciplina._id}/alunos/detalhes`}
                >
                  {disciplina.nome}
                </Link>
              </td>
              <td>{disciplina.descricao}</td>
              <td>{disciplina.creditos}</td>
              <td>{disciplina.cargaHoraria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodasDisciplinasAluno;
