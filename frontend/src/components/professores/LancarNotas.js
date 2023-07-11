import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const LancarNotas = () => {
 

  const { disciplinaId } = useParams();
  const [alunos, setAlunos] = useState([]);
  const [notas, setNotas] = useState({});




  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/disciplinas/${disciplinaId}/alunos`);
        setAlunos(response.data.alunos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlunos();
  }, [disciplinaId]);

  const handleNotaChange = (alunoId, nota) => {
    setNotas((prevNotas) => ({
      ...prevNotas,
      [alunoId]: nota
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const notasData = {
        notas: notas
      };

      await axios.post(`http://localhost:5000/api/notas/${disciplinaId}`, notasData);

      console.log('Notas lançadas com sucesso!');
      limparCampos();
    } catch (error) {
      console.error(error);
    }
  };

  const limparCampos = () => {
    setNotas({});
  };

  return (
    <div>
      <h1>Lançar Notas</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno._id}>
                <td>{aluno.firstName} {aluno.lastName}</td>
                <td>
                  <input
                    type="number"
                    value={notas[aluno._id] || ''}
                    onChange={(e) => handleNotaChange(aluno._id, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Lançar Notas</button>
      </form>
    </div>
  );
};

export default LancarNotas;
