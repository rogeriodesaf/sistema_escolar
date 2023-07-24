import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import React from 'react'

import NotasAlunoDisciplina from './NotasAlunoDisciplina'
import styles from './NotasAlunosDisciplina.module.css'


const DetalhesDisciplinaAluno = () => {
  const { alunoId, disciplinaId } = useParams();
  const [presencas, setPresencas] = useState([]);
  const [faltas, setFaltas] = useState([]);
  
  const [contadorPresencas, setContadorPresencas] = useState(0);
  const [contadorFaltas, setContadorFaltas] = useState(0);

  useEffect(() => {
    // Função para buscar as informações de presenças e faltas do aluno na disciplina
    const fetchPresencasEFaltas = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/alunos/${alunoId}/disciplinas/${disciplinaId}/presencas`);
        const data = await response.json();
        setPresencas(data.presencas);
        setFaltas(data.faltas);
        setContadorPresencas(data.contadorPresencas); // Atualiza o estado com o valor recebido da API
        setContadorFaltas(data.contadorFaltas); // Atualiza o estado com o valor recebido da API
      } catch (error) {
        console.error(error);
      }
    };
    

    fetchPresencasEFaltas();
  }, [alunoId, disciplinaId]);

  return (
    <div className={styles.notas_aluno}>
      <h2>Detalhes da Disciplina</h2>
      <p> Presenças: {contadorPresencas}</p>
      <p> Faltas: {contadorFaltas}</p>
        {/* Renderizar as notas do aluno na disciplina */}
    <NotasAlunoDisciplina />
    </div>
  
  );
};

export default DetalhesDisciplinaAluno;
