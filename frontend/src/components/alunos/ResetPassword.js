import React, { useState } from 'react';
import axios from 'axios';
import formStyles from  '../forms/Form.module.css'
import stylesInput from '../forms/Inputs.module.css'


const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/students/forgot-password', {
        email: email,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Ocorreu um erro ao enviar o e-mail de recuperação de senha.');
    }
  };

  return (
    <div >
      <h1 >Redefinir Senha</h1>
      <form onSubmit={handleResetPassword} className={formStyles.form_container}>
      <p>Digite o seu email e em seguida clique em enviar. Mandaremos uma mensagem para o seu gmail com o link para redefinição de sua senha.</p>
        <label className={stylesInput.form_control} >
          E-mail:
          <input type="email" value={email}   onChange={(e) => setEmail(e.target.value)} />
        </label>
        <input type="submit" text='Enviar E-mail de Recuperação'/>
      </form>
      {message && <p  >{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
