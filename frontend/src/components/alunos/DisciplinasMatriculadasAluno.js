import React from 'react';
import { Link } from 'react-router-dom';


const DisciplinasMatriculadasAluno = ({ disciplinas, aluno }) => {
  return (
    <div>
      <h2>Disciplinas Matriculadas</h2>
      <ul>
        {disciplinas.map((disciplina) => (
          <li key={disciplina._id}>
            {/* Link para a página de detalhes da disciplina para o aluno específico */}
            <Link to={`/disciplinas/${disciplina._id}/alunos/${aluno}/detalhes`
}>
              <h3>{disciplina.nome}</h3>
            </Link>
            <p>{disciplina.descricao}</p>
            <p>Créditos: {disciplina.creditos}</p>
            <p>Carga Horária: {disciplina.cargaHoraria}</p>
          </li>
        ))}
      </ul>
    </div>
  );

};

export default DisciplinasMatriculadasAluno;
