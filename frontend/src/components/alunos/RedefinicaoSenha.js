import React, { useState } from 'react';
import axios from 'axios';
import formStyles from  '../forms/Form.module.css'
import stylesInput from '../forms/Inputs.module.css'






function ResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/students/reset-password/${token}`, {
      
        token,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Erro ao redefinir a senha');
      console.error(error);
    }
  };

  return (
    <div >
      <h2 >Redefinir Senha</h2>
      
      <form onSubmit={handleSubmit} className={formStyles.form_container} >
        
        <label  className={stylesInput.form_control}  >
          Token:
          <input type="text" value={token} onChange={handleTokenChange} placeholder='Insire aqui o token que enviamos para o seu e-mail' />
        </label>
        <label  className={stylesInput.form_control} >
          Nova Senha:
          <input type="password" value={password} onChange={handlePasswordChange} placeholder='Digite aqui a sua nova senha!'/>
        </label >
        <input type="submit" text="Redefinir Senha"/>
         {message && <p >{message}</p>}
      </form>
     
    </div>
  );
}

export default ResetPassword;
