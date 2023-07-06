import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RegistrarAula from '../../professores/RegistrarAula';
import Message from '../../layout/Message';
import useFlashMessage from '../../../hooks/useFlashMessage';

import styles from './AlunosMatriculadosNaDisciplina.module.css';

const AlunosMatriculados = () => {
  const { disciplinaId } = useParams();
  const [alunos, setAlunos] = useState([]);
  const [mostrarLista, setMostrarLista] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const { setFlashMessage } = useFlashMessage();

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

    fetchAlunosMatriculados();
  }, [disciplinaId]);

  const handleClickRegistrarAulas = () => {
    setMostrarFormulario(true);
    setMostrarLista(false);
  };

  const handleFlashMessage = (type, message) => {
    setFlashMessage(type, message);
  };

  return (
    <div className={styles.container}>
      <h1>Bem vindo ao seu ambiente professor(a)</h1>
      {mostrarLista   ? (
        <table className={styles.table}>
        

          <thead>
            <tr>
              <th>Nome</th>
              <th>Sobrenome</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno._id}>
                <td>{aluno.firstName}</td>
                <td>{aluno.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      {mostrarLista && alunos.length === 0 && <p>Nenhum aluno matriculado nesta disciplina.</p>}

      {mostrarFormulario ? (
        <RegistrarAula
          disciplinaId={disciplinaId}
         // handleFlashMessage={handleFlashMessage} // Passe a função handleFlashMessage para o componente RegistrarAula
        />
      ) : (
        <button className={styles.registrarAulasBtn} onClick={handleClickRegistrarAulas}>
          Clique aqui para registrar a aula de hoje!
        </button>
      )}

     {/* <div className={styles.flashMessage}>
        <Message /> 
      </div> */}
    </div>
  );
};

export default AlunosMatriculados;
