import api from '../../../utils/api';
import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './AddDiscipline.module.css';

import DisciplineForm from '../../form/DisciplinaForm';

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage';

function AddDiscipline() {
  const [token] = useState(localStorage.getItem('token') || '');
  const { setFlashMessage } = useFlashMessage();
  const history = useHistory();

  async function registerDiscipline(discipline) {
    let msgType = 'success';
   
    const data = await api
      .post('/api/disciplinas', discipline, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        msgType = 'error';
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
    history.push('/discipline/mydisciplines');
  }

  return (
    <section>
      <div className={styles.adddiscipline_header}>
        <h1>Cadastre uma Disciplina</h1>
        <p>Depois ela ficará disponível para consulta</p>
      </div>
      <DisciplineForm handleSubmit={registerDiscipline} btnText="Cadastrar" />
    </section>
  );
}

export default AddDiscipline;
