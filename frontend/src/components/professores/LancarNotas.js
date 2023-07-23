import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useFlashMessage from '../../hooks/useFlashMessage'
import Input from '../forms/Input'
import styles from '../forms/Form.module.css'
import stylesButton from '../professores/RegistrarAula.module.css';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const LancarNotas = () => {
 
  const [alunoId, setAlunoId] = useState('');
  const [nota, setNota] = useState('');
  const { disciplinaId } = useParams();
  const [alunos, setAlunos] = useState([]);
  const [notas, setNotas] = useState({});
  const { setFlashMessage } = useFlashMessage();
  const history = useHistory();



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

  const handleOnChange = (alunoId, nota) => {
  console.log('alunoId:', alunoId);
  console.log('nota:', nota);
  setNotas((prevNotas) => ({
    ...prevNotas,
    [alunoId]: nota,
  }));
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
        

     console.log('Notas enviadas com sucesso!',nota);
    
     limparCampos();
     e.target.reset(); // Redefine os valores dos campos do formulário para o estado inicial
   
  } catch (error) {
    console.error('Erro ao enviar as notas:', error);
  }
  setFlashMessage(msgText, msgType);
  history.push('/disciplinas/professor');
};

const limparCampos = () => {
  setNotas({});
  setAlunoId('');
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
                  <input
                    type='number'
                    defaultValue={notas[aluno._id] || ''}
                    onChange={(e) => handleOnChange(aluno._id, e.target.value)}
                    placeholder='Insira aqui a nota do aluno!'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={stylesButton.formButton}  type="submit">Lançar Notas</button>
      </form>
      <Link to={`/disciplinas/professor`}>
        Voltar 
      </Link>
    </div>
  );
};

export default LancarNotas;
