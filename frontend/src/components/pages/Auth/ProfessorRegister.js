import React, { useContext, useState } from 'react';
import axios from 'axios';
import Input from '../../forms/Input'
import styles from '../../forms/Form.module.css'
import {Link} from 'react-router-dom'

/* context */
import { ProfessorContext } from '../../../context/ProfessorContext';



function ProfessorRegister() {
  
  const [user, setUser] = useState({
 });

 const { registerProfessor } = useContext(ProfessorContext);

  function handleChange(e){
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  

    function handleSubmit  (e){
    e.preventDefault();
    // Lógica para enviar os dados do formulário
    registerProfessor(user)

    
    // Limpar os campos do formulário
  document.getElementById('name').value = '';
  document.getElementById('sobrenome').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  }
  

  return (
    <div >
    
    <section className={styles.form_container}>
      <h1>Cadastro de Professores</h1>
      <form onSubmit={handleSubmit}>
        <Input
        text= 'nome'
        type= 'text'
        name= 'name'
        placeholder= 'Digite o seu nome'
        handleOnChange = {handleChange}        
        />
         <Input
        text= 'Sobrenome'
        type= 'text'
        name= 'sobrenome'
        placeholder= 'Digite o seu sobrenome'
        handleOnChange = {handleChange}        
        />
          
          <Input
        text= 'E-mail:'
        type= 'email'
        name= 'email'
        placeholder= 'Seu email'
        handleOnChange = {handleChange}        
        />
         <Input
        text= 'Sua senha'
        type= 'password'
        name= 'password'
        placeholder= 'Sua senha'
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

export default ProfessorRegister;