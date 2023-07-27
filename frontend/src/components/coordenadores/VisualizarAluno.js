import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import HistoricoAluno from '../alunos/HistoricoAluno';
import ReactPaginate from 'react-paginate';
import styles from './VisualizarAluno.module.css'



const VisualizarAlunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const history = useHistory();

  // Configurações da paginação
  const itemsPerPage = 5;
  const [pageNumber, setPageNumber] = useState(0);
  const pageCount = Math.ceil(alunos.length / itemsPerPage);

  useEffect(() => {
    // Função para buscar a lista de alunos no backend
    const fetchAlunos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/students/listar');
        const data = await response.json();
        setAlunos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlunos();
  }, []);

  const handleVerHistoricoClick = (alunoId) => {
    // Quando clicar no link "Ver Histórico", definimos o aluno selecionado pelo ID
    
    history.push(`/historico/${alunoId}`);
   /// setAlunoSelecionado(alunoId); // Atualiza o estado com o ID do aluno selecionado
  };

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayAlunos = alunos.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

  return (
    <div>
    <h2>Alunos Cadastrados</h2>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Matrícula</th>
          <th>Ver Histórico</th>
        </tr>
      </thead>
      <tbody>
        {displayAlunos.map((aluno) => (
          <tr key={aluno._id}>
            <td>{aluno.firstName}</td>
            <td>{aluno.matricula}</td>
            <td>
              {/* Ao clicar no link "Ver Histórico", chamamos a função handleVerHistoricoClick passando o ID do aluno */}
              <Link to="#" onClick={() =>  handleVerHistoricoClick(aluno._id)}>
                Ver Histórico
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

      {/* Paginação */}
      <div className={styles.pagination_container}>
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Próximo'}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={styles.pagination}
          previousLinkClassName={styles.previous}
          nextLinkClassName={styles.next}
          disabledClassName={styles.disabled}
          activeClassName={styles.active}
        />
      </div>

      {/* Se um aluno foi selecionado, exibe o histórico dele */}
      {alunoSelecionado && <HistoricoAluno alunoId={alunoSelecionado} />}
    </div>
  );
};

export default VisualizarAlunos;
