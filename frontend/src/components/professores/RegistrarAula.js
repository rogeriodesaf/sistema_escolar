import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import useFlashMessage from '../../hooks/useFlashMessage';
import bus from '../../utils/bus';

import styles from './RegistrarAula.module.css';

function RegistrarAula({ disciplinaId }) {
  const [presencasAluno, setPresencasAluno] = useState([]);

  const [assunto, setAssunto] = useState('');
  const [data, setData] = useState('');
  const [alunos, setAlunos] = useState([]);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    fetch(`http://localhost:5000/api/auth/disciplinas/${disciplinaId}/alunos`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.alunos)) {
          setAlunos(data.alunos);
        } else {
          console.error('A resposta da API não contém um array de alunos:', data);
        }
      })
      .catch((error) => console.error(error));
  }, [disciplinaId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const novaAula = {
      assunto,
      data: moment(data).format(),
      presencas: presencasAluno,
    };

    let msgText;
    let msgType = 'success';

    fetch(`http://localhost:5000/api/disciplinas/disciplinas/${disciplinaId}/aulas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novaAula),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setFlashMessage(msgText, msgType);
      })
      .catch((error) => {
        console.error(error);
        setFlashMessage('error', 'Ocorreu um erro ao registrar a aula.');
      });
  };

  const handlePresencaChange = (alunoId, presente) => {
    setPresencasAluno((prevPresencasAluno) => {
      const updatedPresencasAluno = prevPresencasAluno.map((presenca) => {
        if (presenca.alunoId === alunoId) {
          return { ...presenca, presente };
        }
        return presenca;
      });

      const existingPresenca = updatedPresencasAluno.find((presenca) => presenca.alunoId === alunoId);

      if (!existingPresenca) {
        updatedPresencasAluno.push({ alunoId, presente });
      }

      return updatedPresencasAluno;
    });
  };

  const salvarPresencas = () => {
    const dataPresencas = presencasAluno.map((presenca) => ({
      alunoId: presenca.alunoId,
      presente: presenca.presente,
    }));

    fetch(`http://localhost:5000/api/disciplinas/${disciplinaId}/presencas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ presencas: dataPresencas }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Registrar Aula</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <label htmlFor="assunto" className={styles.formLabel}>
            Assunto:
          </label>
          <textarea
            id="assunto"
            name="assunto"
            value={assunto}
            onChange={(event) => setAssunto(event.target.value)}
            className={styles.formTextarea}
            required
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="data" className={styles.formLabel}>
            Data:
          </label>
          <input
            type="date"
            id="data"
            name="data"
            value={data}
            onChange={(event) => setData(event.target.value)}
            className={styles.formInput}
            required
          />
        </div>

        <div className={styles.formField}>
          <h2 className={styles.formLabel}>Presenças:</h2>
          {alunos.map((aluno) => (
            <div key={aluno._id} className={styles.presencaItem}>
              <span>{aluno.firstName}:</span>
              <div className={styles.presencaButtonContainer}>
               <label>
  <input
    type="checkbox"
    checked={presencasAluno.some((presenca) => presenca.alunoId === aluno._id && presenca.presente)}
    onChange={(e) => handlePresencaChange(aluno._id, e.target.checked)}
  />
  Presente
</label>


                <label>
                <input
  type="checkbox"
  checked={!presencasAluno.some((presenca) => presenca.alunoId === aluno._id && presenca.presente)}
  onChange={(e) => handlePresencaChange(aluno._id, !e.target.checked)}
/>
Falta

                </label>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.formSubmit}>
          <button type="submit" className={styles.formButton} onClick={salvarPresencas}>
            Registrar Aula
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrarAula;
