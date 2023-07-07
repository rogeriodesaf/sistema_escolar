import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RegistrarAula from '../../professores/RegistrarAula'
import useFlashMessage from '../../../hooks/useFlashMessage';

import styles from './AlunosMatriculadosNaDisciplina.module.css';

const AlunosMatriculados = () => {
  const [mostrarH1,setMostrarH1] = useState(true)
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarLista, setMostrarLista] = useState(true);
  const { setFlashMessage } = useFlashMessage();
  const { disciplinaId } = useParams();
  const [alunos, setAlunos] = useState([]);
  const [contagemPresencasFaltas, setContagemPresencasFaltas] = useState({});




  //useEffect(() => { ... }); define um efeito colateral que será executado após a renderização do componente.
  useEffect(() => {
    //fetchAlunosMatriculados é uma função assíncrona que busca os alunos matriculados na disciplina através de uma requisição HTTP.
    const fetchAlunosMatriculados = async () => {
      try {
        //faz a requisição HTTP para obter os alunos matriculados na disciplina.
        const response = await fetch(`http://localhost:5000/api/auth/disciplinas/${disciplinaId}/alunos`);
        //obtém os dados da resposta da requisição no formato JSON.
        const data = await response.json();
        //atualiza o estado alunos com a lista de alunos obtida na requisição.
        setAlunos(data.alunos);
        //chama a função fetchContagemPresencasFaltasForAllAlunos passando a lista de alunos como argumento.
        fetchContagemPresencasFaltasForAllAlunos(data.alunos); // Chama a função após a atualização dos alunos
      } catch (error) {
        console.error(error);
      }
    };

    // é uma função assíncrona que busca a contagem de presenças e faltas de um aluno em uma disciplina através de uma requisição HTTP.
    const fetchContagemPresencasFaltas = async (alunoId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/alunos/${alunoId}/disciplinas/${disciplinaId}/presencas`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    const fetchContagemPresencasFaltasForAllAlunos = async (alunos) => {
      const results = await Promise.all(alunos.map((aluno) => fetchContagemPresencasFaltas(aluno._id)));
      const contagemPresencasFaltas = results.reduce((acc, data, index) => {
        acc[alunos[index]._id] = data;
        return acc;
      }, {});
      setContagemPresencasFaltas(contagemPresencasFaltas);
    };

    fetchAlunosMatriculados();
  }, [disciplinaId]);


  const handleClickRegistrarAulas = () => {
    setMostrarFormulario(true);
    setMostrarLista(false);
    setMostrarH1(false)
  };

  return (
    <div>
    {mostrarH1 && (
      <h1>Alunos Matriculados na Disciplina</h1>)}
      {mostrarLista && (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Presenças</th>
              <th>Faltas</th>
            </tr>
          </thead>

          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno._id}>
                <td>{aluno.firstName}</td>
                <td>{aluno.lastName}</td>
                <td>{contagemPresencasFaltas[aluno._id] && contagemPresencasFaltas[aluno._id].contadorPresencas ? contagemPresencasFaltas[aluno._id].contadorPresencas : 0}</td>
                <td>{contagemPresencasFaltas[aluno._id] && contagemPresencasFaltas[aluno._id].contadorFaltas ? contagemPresencasFaltas[aluno._id].contadorFaltas : 0}</td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
      {mostrarLista && alunos.length === 0 && <p>Nenhum aluno matriculado nesta disciplina.</p>}

      {mostrarFormulario ? (
        <RegistrarAula
          disciplinaId={disciplinaId}
        // handleFlashMessage={handleFlashMessage} // Passe a função handleFlashMessage para o componente RegistrarAula
        />
      ) : (
        <button className={styles.registrarAulasBtn} onClick={handleClickRegistrarAulas}>
          Clique aqui para registrar a aula de hoje!
        </button>
      )}

      {/* <div className={styles.flashMessage}>
  <Message />
</div> */}
    </div>
  );
};

export default AlunosMatriculados;