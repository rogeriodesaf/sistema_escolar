import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useFlashMessage from '../../hooks/useFlashMessage'
import Input from '../forms/Input'
import styles from '../forms/Form.module.css'
import stylesButton from '../professores/RegistrarAula.module.css';


const LancarNotas = () => {
 
  const [alunoId, setAlunoId] = useState('');
  const [nota, setNota] = useState('');
  const { disciplinaId } = useParams();
  const [alunos, setAlunos] = useState([]);
  const [notas, setNotas] = useState([]);
  const { setFlashMessage } = useFlashMessage();




  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/disciplinas/${disciplinaId}/alunos`);
        setAlunos(response.data.alunos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlunos();
  }, [disciplinaId]);

  const handleNotaChange = (alunoId, nota) => {
    setNotas((prevNotas)=>(
      {
        ...prevNotas,
        [alunoId]:nota,
      }
    ));
   // console.log('alunoId:', alunoId);
   // console.log('nota:', nota);
    
    //setAlunoId(alunoId);
   // setNota(nota);

    
  

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let msgText = 'Nota registrada com sucesso para esse aluno!';
    let msgType = 'sucess';
     
    try {
      
     
      for (const alunoId in notas) {
        const nota = notas[alunoId];
        await axios.post(`http://localhost:5000/api/notas/${disciplinaId}/aluno/${alunoId}`, { nota });
      }
        

     console.log('Notas enviadas com sucesso!');
    // Limpar os valores após o envio, se necessário
    limparCampos()
  } catch (error) {
    console.error('Erro ao enviar as notas:', error);
  }
  setFlashMessage(msgText, msgType);
};

  const limparCampos = () => {
    console.log('limpando campos')
   
  };

  return (
    <div>
      <h1>Lançar Notas</h1>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <table>
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno._id}>
                <td>{aluno.firstName} {aluno.lastName}</td>
                <td>
                  <Input
                    type="number"
                    defaultValue={notas[aluno._id] || ''}
                    onChange={(e) => handleNotaChange(aluno._id, e.target.value)}
                    placeholder='Insira aqui a nota do aluno!'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={stylesButton.formButton} onClick={limparCampos} type="submit">Lançar Notas</button>
      </form>
    </div>
  );
};

export default LancarNotas;
