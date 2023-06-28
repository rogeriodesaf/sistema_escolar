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

function ProfessorDisciplinaForm() {

  const [token] = useState(localStorage.getItem('token') || '')





  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [selectedDisciplina, setSelectedDisciplina] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');


  const { setFlashMessage } = useFlashMessage();
 
  const { authenticated } = useContext(Context);

  const [dados, setDados] = useState({
    disciplinaId: '',
    professorId: ''
  });

  const history = useHistory();


  useEffect(() => {
    // Carrega a lista de disciplinas e professores do backend
    fetchDisciplinas();
    fetchProfessores();
  }, []);



  async function fetchProfessores() {
    try {
      const response = await api.get('/api/auth/professors/listar');
      setProfessores(response.data);
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

  const handleProfessorChange = (event) => {
    setSelectedProfessor(event.target.value);
  };

  const handleAssociarClick = async (event) => {
    event.preventDefault();
    if (!authenticated) {
      setFlashMessage('Você precisa estar autenticado para cadastrar uma disciplina');
      return;
    }
    let msgType = 'success'
      
  
      const disciplinaId = selectedDisciplina;
      const professorId = selectedProfessor;
  
      
      // Faça a requisição POST para associar o professor à disciplina
      const data  = await api.post(`/api/disciplinas/${disciplinaId}/professores/${professorId}`, {
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
      setFlashMessage(data.message, msgType)
    history.push('/home')
  };
  return (
    <div className={styles.form_control}>
      <form onSubmit={handleAssociarClick} className={formStyles.form_container}>
        <div className={formStyles.form_control}>
          <h2>Disciplinas</h2>




          <select className={selectStyles.form_control} value={selectedDisciplina} onChange={handleDisciplinaChange}>
            <option value="">Selecione uma disciplina</option>
            {disciplinas.map((disciplina) => (
              <option key={disciplina._id} value={disciplina._id}>{disciplina.nome}</option>
            ))}
          </select>
          <select className={selectStyles.form_control} value={selectedProfessor} onChange={handleProfessorChange}>
            <option value="">Selecione um professor</option>
            {professores.map((professor) => (
              <option key={professor._id} value={professor._id}>{professor.name}</option>
            ))}
          </select>
          <input type='submit' value='Associar' />
        </div>


      </form>
    </div>
  );
}

export default ProfessorDisciplinaForm;
