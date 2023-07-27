import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './PaginaProfessor.module.css';
import jwtDecode from 'jwt-decode';

const PaginaProfessores = () => {
  const history = useHistory();
  const [token] = useState(localStorage.getItem('token') || '');
  const [professorInfo, setProfessorInfo] = useState({});

  useEffect(() => {
    const decoded = jwtDecode(token);
    const professorId = decoded.userId;
    console.log('professorId: ',professorId)
    // Função para buscar as informações do professor
    const fetchProfessorInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/professores/${professorId}`);
        const data = await response.json();
        console.log('data: ',data)
        setProfessorInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfessorInfo();
  }, [token]);

  return (
    <div className={styles.card_container}>
      {/* Card para o componente PaginaAluno */}
      <div>
        <h1>Bem-vindo, {professorInfo.name}!</h1>
      </div>

      {/* Card para visualizar as disciplinas matriculadas */}
      <div className={styles.card}>
        {/* <h3>Disciplinas Matriculadas</h3> */}
        <div className={styles.link_box}>
          <Link to="/disciplinas/professor" className={styles.link_box}>
            Visualizar Suas Turmas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaginaProfessores;
