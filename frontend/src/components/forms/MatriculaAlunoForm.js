import React from 'react';
import { useState, useEffect, useContext } from 'react';
import api from '../../utils/api';
import formStyles from './Form.module.css';
import { useHistory } from 'react-router-dom';
import { Context } from '../../context/UserContext';
import useFlashMessage from '../../hooks/useFlashMessage';
import Select from './Select';
import styles from './Inputs.module.css'
import selectStyles from './Select.module.css'

import Input from './Input';
import axios from 'axios';

function AlunoDisciplinaForm() {

  const [token] = useState(localStorage.getItem('token') || '')





  const [disciplinas, setDisciplinas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [selectedDisciplina, setSelectedDisciplina] = useState('');
  const [selectedAluno, setSelectedAluno] = useState('');


  const { setFlashMessage } = useFlashMessage();
 
  const { authenticated } = useContext(Context);

  const [dados, setDados] = useState({
    disciplinaId: '',
    alunoId: ''
  });

  const history = useHistory();


  useEffect(() => {
    // Carrega a lista de disciplinas e professores do backend
    fetchDisciplinas();
    fetchAlunos();
  }, []);



  async function fetchAlunos() {
    try {
      const response = await api.get('/api/auth/students/listar');
      setAlunos(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchDisciplinas() {
    try {
      const response = await api.get('/api/disciplinas/disciplinas/listar');
      setDisciplinas(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDisciplinaChange = (event) => {
    setSelectedDisciplina(event.target.value);
  };

  const handleAlunoChange = (event) => {
    setSelectedAluno(event.target.value);
  };

  const handleAssociarClick = async (event) => {
    event.preventDefault();
    if (!authenticated) {
      setFlashMessage('Você precisa estar autenticado para cadastrar uma disciplina');
      return;
    }
    let msgType = 'success'
      
  
      const disciplinaId = selectedDisciplina;
      const alunoId = selectedAluno;
  
      console.log('Token:', token);
      // Faça a requisição POST para associar o professor à disciplina

     try {
    const response = await api.post(
      `/api/auth/disciplinas/${disciplinaId}/alunos/${alunoId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    setFlashMessage(response.data.message, msgType);
    history.push('/home');
  } catch (error) {
    console.log(error);
    msgType = 'error';
  setFlashMessage(error.error, msgType);

  }
};
     
  return (
    <div className={styles.form_control}>
      <form onSubmit={handleAssociarClick} className={formStyles.form_container}>
        <div className={formStyles.form_control}>
          <h2>Matricula</h2>




          <select className={selectStyles.form_control} value={selectedDisciplina} onChange={handleDisciplinaChange}>
            <option value="">Selecione uma disciplina</option>
            {disciplinas.map((disciplina) => (
              <option key={disciplina._id} value={disciplina._id}>{disciplina.nome}</option>
            ))}
          </select>
          <select className={selectStyles.form_control} value={selectedAluno} onChange={handleAlunoChange}>
            <option value="">Selecione um aluno</option>
            {alunos.map((aluno) => (
              <option key={aluno._id} value={aluno._id}>{aluno.firstName+ ' '+aluno.lastName}</option>
            ))}
          </select>
          <input type='submit' value='Matricular' />
        </div>


      </form>
    </div>
  );
}

export default AlunoDisciplinaForm;
