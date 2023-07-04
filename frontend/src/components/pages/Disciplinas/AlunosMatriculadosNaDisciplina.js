import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AlunosMatriculados = () => {
  const { disciplinaId } = useParams();
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    // Aqui você pode fazer uma requisição para obter a lista de alunos matriculados na disciplina
    // Pode ser usando fetch, axios ou a biblioteca que preferir
    // Atualize o estado dos alunos com os dados obtidos da requisição

    // Exemplo:
    const fetchAlunosMatriculados = async () => {
      try {
        console.log(disciplinaId)
        const response = await fetch(`http://localhost:5000/api/auth/disciplinas/${disciplinaId}/alunos`);
        const data = await response.json();
        setAlunos(data.alunos);
        console.log("data: ", alunos)
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlunosMatriculados();
  }, [disciplinaId]);


  const registrarAulas = async () => {
    try {
      // Fazer a requisição para registrar as aulas e fazer a chamada dos alunos
      // Pode ser utilizando fetch ou axios
      // Atualize o estado ou faça qualquer tratamento necessário com a resposta da API
      // Exemplo utilizando fetch:
      const response = await fetch(`http://localhost:5000/api/auth/disciplinas/${disciplinaId}/registrar-aulas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Pode enviar qualquer dado adicional na requisição, se necessário
      });
      const data = await response.json();
      console.log(data); // Exemplo de tratamento da resposta da API
  
      // Atualize o estado ou faça qualquer ação necessária com base na resposta da API
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <h2>Alunos Matriculados na Disciplina</h2>
      {alunos.length === 0 ? (
        <p>Nenhum aluno matriculado nesta sssssssssssdisciplina.</p>
      ) : (
        <ul>
          {alunos.map((aluno) => (
            <li key={aluno._id}>
              <h3>{aluno.firstName+' ' +aluno.lastName}</h3>
              {/* Renderize outras informações relevantes do aluno, se necessário */}
            </li>
          ))}
        </ul>
      )}
    
<button onClick={registrarAulas}>Registrar Aulas</button>

    </div>
  );
};

export default AlunosMatriculados;
