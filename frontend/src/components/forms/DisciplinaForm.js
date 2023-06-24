import { useState,useEffect  } from 'react';
import React from 'react';
import api from '../../utils/api';
import formStyles from './Form.module.css';
import useFlashMessage from '../../hooks/useFlashMessage';
import bus from '../../utils/bus';



import Input from './Input';


// Componente
function DisciplineForm({ btnText }) {

  const {setFlashMessage } = useFlashMessage();



 



  const [discipline, setDiscipline] = useState({
    nome: '',
    descricao: '',
    creditos: '',
    cargaHoraria: ''
  });


  function handleChange(e) {
    setDiscipline({ ...discipline, [e.target.name]: e.target.value });
  }



const submit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/api/disciplinas', discipline);
      console.log(response.data); // Faça o tratamento da resposta do servidor aqui

      setFlashMessage('Disciplina cadastrada com sucesso'); // Defina a mensagem de flash
      

      setDiscipline({
        nome: '',
        descricao: '',
        creditos: '',
        cargaHoraria: ''
      });
      
    } catch (error) {
      console.log(error); // Faça o tratamento de erros aqui

      setFlashMessage('Ocorreu um erro ao cadastrar a disciplina'); // Defina a mensagem de flash de erro
    
    }
  };


  return (
    <div>

    <form onSubmit={submit} className={formStyles.form_container}>
      
      <Input
        text="Nome da Disciplina"
        type="text"
        name="nome"
        placeholder="Digite o nome"
        handleOnChange={handleChange}
        value={discipline.nome || ''}
      />
      <Input
        text="Descrição da Disciplina"
        type="text"
        name="descricao"
        placeholder="Digite a descrição"
        handleOnChange={handleChange}
        value={discipline.descricao || ''}
      />
      <Input
        text="Créditos da Disciplina"
        type="number"
        name="creditos"
        placeholder="Digite os créditos"
        handleOnChange={handleChange}
        value={discipline.creditos || ''}
      />
      <Input
        text="Carga Horária da Disciplina"
        type="number"
        name="cargaHoraria"
        placeholder="Digite a carga horária"
        value={discipline.cargaHoraria || ''}
        handleOnChange={handleChange}
      />
       {/*{flashMessage && <div>{flashMessage}</div>}*/}
       <input type="submit" value={btnText} />
    </form>
    </div>
  );
}

export default DisciplineForm
