import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import api from '../../utils/api';
import useFlashMessage from '../../hooks/useFlashMessage'
import { Link } from 'react-router-dom';
import DisciplinasMatriculadasAluno from './DisciplinasMatriculadasAluno';
import HistoricoAluno from './HistoricoAluno';



function AlunosDisciplinas() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  const decoded = jwtDecode(token);
  const alunoId = decoded.userId;
   console.log(alunoId)

  const fetchDisciplinasMatriculadas = async () => {
    
    try {
      const response = await fetch(`http://localhost:5000/api/auth/alunos/${alunoId}/disciplinas`);
      const data = await response.json();
      setDisciplinas(data.disciplinas); // Define as disciplinas no estado local
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDisciplinasMatriculadas();
  }, []);
    

  

  

  return (
    <div>
      <h1>Detalhes do Aluno</h1>
      {/* Renderizar informações do aluno aqui */}
      {/* ... */}
  
      {/* Renderizar as disciplinas matriculadas pelo aluno */}
      <DisciplinasMatriculadasAluno disciplinas={disciplinas} aluno={alunoId} />
  
      {/* Link para retornar à página de médias dos alunos */}
     {/* <Link to={`/disciplinas/${disciplinaId}/mostrar-media`}>
        Voltar para Médias dos Alunos
      </Link> */}
      
    </div>
  );
 
};
export default AlunosDisciplinas