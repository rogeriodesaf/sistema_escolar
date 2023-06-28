import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import styles from '../Disciplinas/DisciplineList.module.css';

function AlunosList() {
  const [alunos, setAlunos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Define o número de itens por página

  useEffect(() => {
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

  // Calcula o índice inicial e final dos itens da página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = alunos.slice(indexOfFirstItem, indexOfLastItem);

  // Função para mudar para a próxima página
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Função para voltar para a página anterior
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className={styles.table_container}>
      <table>
        {/* Cabeçalho da tabela */}
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>email</th>
            <th>Disciplina</th>
           
            {/* Adicione mais colunas conforme necessário */}
          </tr>
        </thead>
        {/* Itens da página atual */}
        <tbody>
          {currentItems.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.firstName}</td>
              <td>{aluno.lastName}</td>
              <td>{aluno.email}</td>
              <td>{aluno.disciplinas}</td>
           
              {/* Preencha com mais colunas de acordo com os dados da disciplina */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>{currentPage}</span>
        <button 
        className={styles.paginationButton}
        onClick={nextPage} 
        disabled={indexOfLastItem >= alunos.length}>
          Próxima
        </button>
      </div>
    </div>
  );
}

export default AlunosList;
