import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DisciplinasMatriculadasAlunos.module.css'


const DisciplinasMatriculadasAluno = ({ disciplinas, aluno }) => {
  return (
    <div >
    <h2>Disciplinas Matriculadas</h2>
    <p>Click no nome da disciplina para ter acesso a mais detalhes.</p>
    <table  className={styles.table}>
      <thead>
        <tr>
          <th>Disciplina</th>
          <th>Descrição</th>
          <th>Créditos</th>
          <th>Carga Horária</th>
        </tr>
      </thead>
      <tbody>
        {disciplinas.map((disciplina) => (
          <tr key={disciplina._id}>
            <td className={styles.td}>
              {/* Link para a página de detalhes da disciplina para o aluno específico */}
              <Link to={`/disciplinas/${disciplina._id}/alunos/${aluno}/detalhes`} className={styles.a}>
                {disciplina.nome}
              </Link>
            </td>
            <td>{disciplina.descricao}</td>
            <td>{disciplina.creditos}</td>
            <td>{disciplina.cargaHoraria}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );

};

export default DisciplinasMatriculadasAluno;
