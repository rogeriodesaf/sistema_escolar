
import React, { useContext, useState } from 'react';
import axios from 'axios';
import Input from '../../forms/Input'
import styles from '../../forms/Form.module.css'
import {Link} from 'react-router-dom'


import { Context } from '../../../context/UserContext';

function Login() {
  
  const [loading, setLoading] = useState(false);

  const [userType, setUserType] = useState(''); // Estado para armazenar o tipo de usuário
  const [user, setUser] = useState({})
  const {login, loginProfessor,loginCoordenador,updateUserType} = useContext(Context)
  function handleChange(e){
    setUser({ ...user, [e.target.name]: e.target.value });
  }


  function handleUserTypeChange(e) {
    setUserType(e.target.value);
  }

 const handleSubmit = async (e)=>{
    e.preventDefault();
    // Ativar o indicador de carregamento
  setLoading(true);
// só pra testar
    if (userType === 'professor') {
     await loginProfessor(user, userType);
     updateUserType('professor');
    } 
    else if (userType === 'coordenador'){
      await loginCoordenador(user, userType);
      updateUserType('coordenador'); // Atualiza o userType para 'coordenador'
    }else if (userType === 'aluno'){
      await login(user, userType);
      updateUserType('aluno'); // Atualiza o userType para 'aluno'
    } 
    // Desativar o indicador de carregamento após o login
  setLoading(false);
   
    // Lógica para enviar os dados do formulário
   
  login(user,userType)
  }
  console.log(user)
  console.log(userType)

   return (
    <div >
    
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
     {/* <select value={userType} onChange={handleUserTypeChange}>
            <option value="aluno">Aluno</option>
            <option value="professor">Professor</option>
   </select> */}

          <select  className={styles.form_container} value={userType} onChange={handleUserTypeChange}>
            <option value="">Selecione um tipo de usuário</option>
            <option value="aluno">Aluno</option>
            <option value="professor">Professor</option>
            <option value="coordenador">Coordenador</option>
          </select>
        <Input
        text= 'email'
        type= 'email'
        name= 'email'
        placeholder= 'Digite o seu email de login'
        handleOnChange = {handleChange}        
        />
         <Input
        text= 'Digite sua senha'
        type= 'password'
        name= 'password'
        placeholder= 'Digite sua senha'
        handleOnChange = {handleChange}        
        />
          
       {/* Indicador de carregamento */}
 {/*} {loading ? (
    <p>Carregando...</p>
  ) : (
    <button type="submit">Entrar</button>
  )} */}
        
       <input type='submit' value= 'Entrar'/>
      </form>
      <p>
        É aluno e não possui cadastro? <Link to='/register'>Clique aqui</Link>
      </p>
      <p>
        É professor e não possui cadastro? <Link to='/register/professor'>Clique aqui</Link>
      </p>
      </section>
    </div>
  );
}

export default Login;
