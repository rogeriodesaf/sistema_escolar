import React, { useState } from 'react';
import axios from 'axios';
import Input from '../../forms/Input'
import styles from '../../forms/Form.module.css'
import {Link} from 'react-router-dom'

function Register() {
  
  
  

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'Aluno',
    firstName: '',
    lastName: ''
   
  });

  function handleChange(e){
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Valores pré-definidos
  const preFilledValues = {
    role: 'Aluno',
    
  };

  // Definir os valores pré-definidos quando o componente é renderizado
  useState(() => {
    setFormData({ ...formData, ...preFilledValues });
  }, []);

    function handleSubmit  (e){
    e.preventDefault();
    // Lógica para enviar os dados do formulário
    console.log(formData)
  };

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
        value={formData.role}
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
