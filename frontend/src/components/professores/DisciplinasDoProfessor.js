import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import api from '../../utils/api';
import useFlashMessage from '../../hooks/useFlashMessage'

function ProfessorDisciplinas() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    // Obtém o token armazenado no LocalStorage
    //const token = localStorage.getItem('token');
    
    // Verifica se o token existe
    //if (token) {
      // Decodifica o token para obter o ID do professor
      const decoded = jwtDecode(token);
     const professorId = decoded.userId;
      console.log(professorId)
      
      // Faz a chamada de API para obter as disciplinas do professor
      api.get(`/api/auth/professores/${professorId}/disciplinas`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setDisciplinas(response.data)
      })
  }, [token])

  

  return (
    <div>
      <h2>Disciplinas do Professor</h2>
      {disciplinas.length === 0 ? (
        <p>Nenhuma disciplina encontrada.</p>
      ) : (
        <ul>
          {disciplinas.map((disciplina) => (
            <li key={disciplina._id}>
              <h3>{disciplina.nome}</h3>
              <p>{disciplina.descricao}</p>
              <p>Créditos: {disciplina.creditos}</p>
              <p>Carga Horária: {disciplina.cargaHoraria}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProfessorDisciplinas;
