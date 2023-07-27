import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './PaginaAluno.module.css';
import jwtDecode from 'jwt-decode';

const PaginaAluno = () => {
  const history = useHistory();
  const [token] = useState(localStorage.getItem('token') || '');
  const [alunoInfo, setAlunoInfo] = useState({});

  useEffect(() => {
    const decoded = jwtDecode(token);
    const alunoId = decoded.userId;

    // Função para buscar as informações do aluno
    const fetchAlunoInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/alunos/${alunoId}`);
        const data = await response.json();
        setAlunoInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlunoInfo();
  }, [token]);

  return (
    <div className="card-container">
      {/* Card para o componente PaginaAluno */}
      <div className="card">
        <h1>Bem-vindo, {alunoInfo.name}!</h1>
      </div>

      {/* Card para visualizar as disciplinas matriculadas */}
      <div className={styles.card}>
        <h3>Disciplinas Matriculadas</h3>
        <div className={styles.link_box}>
          <Link to="/alunos/disciplinas" className={styles.link_box}>
            Visualizar Disciplinas Matriculadas
          </Link>
        </div>
      </div>

      {/* Card para visualizar todas as disciplinas disponíveis */}
      <div className={styles.card}>
        <h3>Todas as Disciplinas</h3>
        <div className={styles.link_box}>
          <Link to="/disciplinas-list" className={styles.link_box}>
            Visualizar Todas as Disciplinas do Curso
          </Link>
        </div>
      </div>

    
    </div>
  );
};

export default PaginaAluno;
