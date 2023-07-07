import React from 'react';

class ListaAlunos extends React.Component {
  render() {
    const { disciplina, alunos } = this.props;

    return (
      <div>
        <h2>Alunos Matriculados</h2>
        {alunos.map((aluno) => {
          const presencas = disciplina.presencas.filter((presenca) => presenca.aluno === aluno._id);
          const faltas = disciplina.aulas.length - presencas.length;

          return (
            <div key={aluno._id}>
              <span>{aluno.nome}</span>
              <span>Presenças: {presencas.length}</span>
              <span>Faltas: {faltas}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ListaAlunos;
