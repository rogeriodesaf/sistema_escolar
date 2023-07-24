import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import styles from '../pages/Disciplinas/AlunosMatriculadosNaDisciplina.module.css';


const DetalhesAluno = (props) => {

  const alunoId = props.match.params.alunoId;
  const disciplinaId = props.match.params.disciplinaId;
  const history = useHistory();

  const [notas, setNotas] = useState([]);



  // Função para buscar as notas do aluno pelo id
  const fetchNotasDoAluno = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/notas/aluno/${alunoId}`);
      const data = await response.json();
      setNotas(data); // Define as notas no estado local
      // Extrai o disciplinaId do primeiro elemento do array de notas, caso haja notas

    } catch (error) {
      console.error(error);
    }
  };

  // Buscar as notas do aluno ao carregar o componente
  useEffect(() => {
    fetchNotasDoAluno();
  }, []);

  const handleEditarNota = (nota) => {
    // Aqui você pode implementar a lógica para abrir um formulário de edição
    // para a nota específica. Você pode usar um modal ou criar uma nova página de edição.
    // Por exemplo:
    history.push(`/disciplina/${disciplinaId}/aluno/${alunoId}/editar-nota/${nota._id}`); // Navega para a página de edição, passando o id da nota como parâmetro.
  };


  return (
    <div>
      <h1>Detalhes do Aluno</h1>
      <h2>Notas do Aluno</h2>
      <table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Nota</th>
            <th>Editar Nota</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota) => (

            <tr key={nota._id}>
              <td>{nota.aluno}</td>
              <td>{nota.nota}</td>
              <td>
                <button className={styles.registrarAulasBtn} onClick={() => handleEditarNota(nota)}>Editar</button>
              </td>
            </tr>

          ))}

        </tbody>
      </table>
      {/* Link para retornar à página de médias dos alunos */}
      <Link to={`/disciplinas/${disciplinaId}/mostrar-media`}>
        Voltar para Médias dos Alunos
      </Link>

    </div>
  );
};

export default DetalhesAluno;
