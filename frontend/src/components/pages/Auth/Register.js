import React, { useContext, useState } from 'react';
import axios from 'axios';
import Input from '../../forms/Input'
import styles from '../../forms/Form.module.css'
import {Link} from 'react-router-dom'

/* context */
import { Context } from '../../../context/UserContext';

function Register() {
  
  const [user, setUser] = useState({
    email: '',
    password: '',
    role: 'aluno',
    firstName: '',
    lastName: ''
   
  });

  const {register} = useContext(Context)

  function handleChange(e){
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  // Valores pré-definidos
  const preFilledValues = {
    role: 'aluno',
    
  };

  // Definir os valores pré-definidos quando o componente é renderizado
  useState(() => {
    setUser({ ...user, ...preFilledValues });
  }, []);

    function handleSubmit  (e){
    e.preventDefault();
    // Lógica para enviar os dados do formulário
   register(user)

    
    // Limpar os campos do formulário
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  }
  

  return (
    <div >
    
    <section className={styles.form_container}>
      <h1>Cadastro de Alunos</h1>
      <form onSubmit={handleSubmit}>
        <Input
        text= 'Email'
        type= 'email'
        name= 'email'
        placeholder= 'Digite o seu email'
        handleOnChange = {handleChange}        
        />
         <Input
        text= 'Senha'
        type= 'password'
        name= 'password'
        placeholder= 'Digite a sua senha'
        handleOnChange = {handleChange}        
        />
           <Input
        text= 'Função'
        type= 'text'
        name= 'role'
        value={user.role}
        handleOnChange = {handleChange}  
        disabled // Para evitar que o campo seja editável      
        />
          <Input
        text= 'Seu primeiro nome'
        type= 'text'
        name= 'firstName'
        placeholder= 'Seu primeiro nome'
        handleOnChange = {handleChange}        
        />
         <Input
        text= 'Seu sobrenome'
        type= 'text'
        name= 'lastName'
        placeholder= 'Seu sobrenome'
        handleOnChange = {handleChange}        
        />
        
       <input type='submit' value= 'cadastrar'/>
      </form>
      <p>
        Já tem conta? <Link to='/login'>Clique aqui</Link>
      </p>
      </section>
    </div>
  );
}

export default Register;