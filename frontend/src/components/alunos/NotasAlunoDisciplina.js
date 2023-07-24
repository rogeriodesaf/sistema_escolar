import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './NotasAlunosDisciplina.module.css'

const NotasAlunoDisciplina = () => {
  const { alunoId, disciplinaId } = useParams();
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    const fetchNotasAlunoDisciplina = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/notas/alunos/${alunoId}/disciplinas/${disciplinaId}/notas`);
        const data = await response.json();
        console.log( 'esses são os dados',data)
        setNotas(data);
        console.log('o setNotas: ',setNotas)
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotasAlunoDisciplina();
  }, [alunoId, disciplinaId]);

  return (
    <div className={styles.notas_aluno}>
      <h3>Notas do Aluno</h3>
      <table>
        <thead>
          <tr>
            <th>Disciplina</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
         
        
           {notas.map((nota) => (
            <tr key={nota._id}>
              <td>{nota.disciplina}</td>
              <td>{nota.nota}</td>
            </tr>
          ))} 
        </tbody>
      </table>
    </div>
  );
};

export default NotasAlunoDisciplina;
