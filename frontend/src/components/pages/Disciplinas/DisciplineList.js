import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import styles from './DisciplineList.module.css';

function DisciplineList() {
  const [disciplines, setDisciplines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Define o número de itens por página

  useEffect(() => {
    fetchDisciplines();
  }, []);

  async function fetchDisciplines() {
    try {
      const response = await api.get('/api/disciplinas/disciplinas/listar');
      setDisciplines(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Calcula o índice inicial e final dos itens da página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = disciplines.slice(indexOfFirstItem, indexOfLastItem);

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
            <th>Descrição</th>
            <th>Créditos</th>
            <th>Carga Horária</th>
            {/* Adicione mais colunas conforme necessário */}
          </tr>
        </thead>
        {/* Itens da página atual */}
        <tbody>
          {currentItems.map((disciplina) => (
            <tr key={disciplina.id}>
              <td>{disciplina.nome}</td>
              <td>{disciplina.descricao}</td>
              <td>{disciplina.creditos}</td>
              <td>{disciplina.cargaHoraria}</td>
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
        disabled={indexOfLastItem >= disciplines.length}>
          Próxima
        </button>
      </div>
    </div>
  );
}

export default DisciplineList;
