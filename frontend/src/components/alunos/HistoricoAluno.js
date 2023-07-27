import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import styles from './HistoricoAluno.module.css';

const HistoricoAluno = ({ alunoId: propAlunoId }) => {
  const { alunoId: paramsAlunoId } = useParams();
  const [historico, setHistorico] = useState([]);
  const alunoId = paramsAlunoId || propAlunoId;

  useEffect(() => {
    // Função para buscar o histórico do aluno no backend
    const fetchHistorico = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/historico/${alunoId}`);
        const data = await response.json();
        setHistorico(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistorico();
  }, [alunoId]);

  // Função para gerar o PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Adicionar a imagem (logo) ao documento PDF
    doc.text('Seminário Teológico Congregacional do Nordeste', 10, 20); // Ajuste as coordenadas (50, 25) conforme necessário
    doc.text('Histórico do Aluno', 50, 30); // Ajuste as coordenadas (50, 25) conforme necessário
  
    const headers = [['Disciplina', 'Média Final']];
    const data = historico.map((item) => [item.disciplina, item.media]);
    doc.autoTable({
      head: headers,
      body: data,
      startY: 40, // Ajuste a coordenada inicial do corpo da tabela conforme necessário
    });
  
    doc.save('historico_aluno.pdf');
  };

  return (
    <div>
      <h2>Histórico do Aluno</h2>
      {/* Restante do código para exibir a tabela do histórico */}
      <table>
        <thead>
          <tr>
            <th>Disciplina</th>
            <th>Média Final</th>
          </tr>
        </thead>
        <tbody>
          {historico.map((item) => (
            <tr key={item.disciplina}>
              <td>{item.disciplina}</td>
              <td>{item.media}</td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {/* Botão para gerar o PDF */}
      <button className={styles.button} onClick={generatePDF}>Gerar PDF</button>
    </div>
  );
};

export default HistoricoAluno;
