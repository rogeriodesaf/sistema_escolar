import React from 'react';
import  { useState, useEffect, useContext } from 'react';
import api from '../../utils/api';
import formStyles from './Form.module.css';
import { useHistory } from 'react-router-dom';
import { Context } from '../../context/UserContext';
import useFlashMessage from '../../hooks/useFlashMessage';
import Select from './Select';
import styles from './Inputs.module.css'
import selectStyles from './Select.module.css'

import Input from './Input';

function ProfessorDisciplinaForm() {
    const [disciplinas, setDisciplinas] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [selectedDisciplina, setSelectedDisciplina] = useState('');
    const [selectedProfessor, setSelectedProfessor] = useState('');


  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem('token') || '')
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
    try {

    const data = await api.post(
  `/api/disciplinas/${selectedDisciplina}/professoresprofessors/${selectedProfessor }`);
  // Atualiza a lista de disciplinas após a associação
      fetchDisciplinas();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.form_control}>
<form onSubmit={handleAssociarClick} className={formStyles.form_container}>
<div className={formStyles.form_control}>
    <h2>Disciplinas</h2>



    
   <select  className= {selectStyles.form_control} value={selectedDisciplina} onChange={handleDisciplinaChange}>
      <option value="">Selecione uma disciplina</option>
      {disciplinas.map((disciplina) => (
        <option key={disciplina._id} value={disciplina._id}>{disciplina.nome}</option>
      ))}
    </select>
    <select className= {selectStyles.form_control}  value={selectedProfessor} onChange={handleProfessorChange}>
      <option value="">Selecione um professor</option>
      {professores.map((professor) => (
        <option key={professor._id} value={professor._id}>{professor.name}</option>
      ))}
      </select> 
      <input type='submit' value= 'Associar'/>
  </div>


</form>
</div>
);}
 
 export default ProfessorDisciplinaForm;
 