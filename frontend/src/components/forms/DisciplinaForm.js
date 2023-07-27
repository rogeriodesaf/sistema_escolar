import { useState, useEffect, useContext } from 'react';
import React from 'react';
import api from '../../utils/api';
import formStyles from './Form.module.css';
import useFlashMessage from '../../hooks/useFlashMessage';
import bus from '../../utils/bus';
import { useHistory } from 'react-router-dom';
import { Context } from '../../context/UserContext';
import Message from '../layout/Message.module.css'

import Input from './Input';

// Componente
function DisciplineForm({ btnText }) {
  const [token] = useState(localStorage.getItem('token') || '')
 
  
  const history = useHistory();
  const { setFlashMessage } = useFlashMessage();
  const { authenticated } = useContext(Context);

  const [discipline, setDiscipline] = useState({
    nome: '',
    descricao: '',
    creditos: '',
    cargaHoraria: ''
  });

  function handleChange(e) {
    setDiscipline({ ...discipline, [e.target.name]: e.target.value });
  }

  const submit = async (e) => {
    e.preventDefault();

    if (!authenticated) {
      setFlashMessage('Você precisa estar autenticado para cadastrar uma disciplina');
      return;
    }
    let msgText = 'Cadastro realizado com sucesso!';
    let msgType = 'sucess';
  
    const data  = await api.post('/api/disciplinas', discipline, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
      
        },
      })
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })
      setFlashMessage(msgText, msgType);
    history.push('/home-coordenador')
  };

  return (
    <div>
      <form onSubmit={submit} className={formStyles.form_container}>
        <Input
          text="Nome da Disciplina"
          type="text"
          name="nome"
          placeholder="Digite o nome"
          handleOnChange={handleChange}
          value={discipline.nome }
        />
        <Input
          text="Descrição da Disciplina"
          type="text"
          name="descricao"
          placeholder="Digite a descrição"
          handleOnChange={handleChange}
          value={discipline.descricao }
        />
        <Input
          text="Créditos da Disciplina"
          type="number"
          name="creditos"
          placeholder="Digite os créditos"
          handleOnChange={handleChange}
          value={discipline.creditos }
        />
        <Input
          text="Carga Horária da Disciplina"
          type="number"
          name="cargaHoraria"
          placeholder="Digite a carga horária"
          value={discipline.cargaHoraria }
          handleOnChange={handleChange}
        />
        {/*{flashMessage && <div>{flashMessage}</div>}*/}
        <input type="submit" value={btnText} />
      </form>
    </div>
  );
}

export default DisciplineForm;







