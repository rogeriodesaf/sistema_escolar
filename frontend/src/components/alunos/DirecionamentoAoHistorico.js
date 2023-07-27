import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import useFlashMessage from '../../hooks/useFlashMessage';
import HistoricoAluno from './HistoricoAluno';

function DirecionamentoHistorico() {
  const [alunoId, setAlunoId] = useState(null);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    // Função para buscar o alunoId do token do usuário
    const fetchAlunoId = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          setAlunoId(decoded.userId);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlunoId();
  }, []);

  return (
    <div>
      {/* Renderizar informações do aluno aqui */}
      {/* ... */}
      {/* Link para retornar à página de médias dos alunos */}
      {/* <Link to={`/disciplinas/${disciplinaId}/mostrar-media`}>
        Voltar para Médias dos Alunos
      </Link> */}
      {/* Renderizar as disciplinas matriculadas pelo aluno */}
      {alunoId && <HistoricoAluno alunoId={alunoId} />}
    </div>
  );
}

export default DirecionamentoHistorico;
