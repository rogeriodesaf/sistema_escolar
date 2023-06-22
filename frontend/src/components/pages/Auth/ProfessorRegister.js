import React, { useContext, useState } from 'react';
import axios from 'axios';
import Input from '../../forms/Input';
import styles from '../../forms/Form.module.css';
import { Link } from 'react-router-dom';

/* context */
import { ProfessorContext } from '../../../context/ProfessorContext';






function ProfessorRegister() {
  const [userType, setUserType] = useState(''); // Estado para armazenar o tipo de usuário
  const [user, setUser] = useState({});
  const { registerProfessor , registerCoordenador } = useContext(ProfessorContext);
  

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

   function handleUserTypeChange(e) {
    setUserType(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Determine qual função de registro chamar com base no tipo de usuário selecionado
    if (userType === 'professor') {
    await registerProfessor(user, userType);
     }
     else if (userType === 'coordenador') {
      await registerCoordenador(user,userType);
    }
    
    // Limpar os campos do formulário
    document.getElementById('name').value = '';
    document.getElementById('sobrenome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
  }

  return (
    <div>
      <section className={styles.form_container}>
        <h1>Cadastro de Professores e Coordenadores</h1>
        <form onSubmit={handleSubmit}>
        <select  className={styles.form_container} value={userType} onChange={handleUserTypeChange}>
            <option value="">Selecione um tipo de usuário</option>
            <option value="coordenador">Coordenador</option>
            <option value="professor">Professor</option>
          </select>
          <Input
            text="Nome"
            type="text"
            name="name"
            placeholder="Digite o seu nome"
            handleOnChange={handleChange}
          />
          <Input
            text="Sobrenome"
            type="text"
            name="sobrenome"
            placeholder="Digite o seu sobrenome"
            handleOnChange={handleChange}
          />
          <Input
            text="E-mail"
            type="email"
            name="email"
            placeholder="Seu email"
            handleOnChange={handleChange}
          />
          <Input
            text="Senha"
            type="password"
            name="password"
            placeholder="Sua senha"
            handleOnChange={handleChange}
          />
          
          <input type="submit" value="Cadastrar" />
        </form>
        <p>
          Já tem conta? <Link to="/login">Clique aqui</Link>
        </p>
      </section>
    </div>
  );
}

export default ProfessorRegister;
