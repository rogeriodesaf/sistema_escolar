import api from "../utils/api";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useFlashMessage from './useFlashMessage';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
    }
  }, []);

  async function register(user) {
    let msgText = 'Cadastro realizado com sucesso!';
    let msgType = 'sucess';

    try {
      const data = await api.post('/api/auth/students/register', user).then((response) => {
        return response.data;
      });
      console.log(data);
    } catch (error) {
      msgText = error.response.data.error;
      msgType = 'error';
    }
    setFlashMessage(msgText, msgType);
  }

  async function loginProfessor(user,userType) {
    let msgText = 'Login realizado com sucesso!';
    let msgType = 'success';

    try {
      const data = await api.post('/api/auth/professors/login', user).then((response) => {
        return response.data;
      });

      await authUser(data,userType);
      console.log(data);
    } catch (error) {
      msgText = error.response.data.error;
      msgType = 'error';
    }

    setFlashMessage(msgText, msgType);
  }

  async function loginCoordenador(user,userType) {
    let msgText = 'Login realizado com sucesso!';
    let msgType = 'sucess';

    try {
      const data = await api.post('/api/auth/coordenador/login', user).then((response) => {
        return response.data;
      });

      await authUser(data,userType);
      console.log(data);
    } catch (error) {
      msgText = error.response.data.error;
      msgType = 'error';
    }

    setFlashMessage(msgText, msgType);
  }

  async function login(user, userType) {
    let msgText = 'Login realizado com sucesso!';
    let msgType = 'sucess';

    let data;

    try {
      if (userType === 'aluno') {
        const data = await api.post('/api/auth/students/login', user).then((response) => {
          return response.data;
        });
        console.log(data);
        await authUser(data,userType);
      } else if (userType === 'professor') {
        loginProfessor(user,userType);
      } else if (userType === 'coordenador') {
        loginCoordenador(user);
      }
    } catch (error) {
      msgText = error.response.data.error;
      msgType = 'error';
    }
    setFlashMessage(msgText, msgType);
  };

  async function authUser(data,userType) {
    setAuthenticated(true);
    localStorage.setItem('token', JSON.stringify(data.token));
    if(userType === 'aluno'){
      history.push('/home-aluno');
    } else if (userType === 'professor'){
      history.push('/home-professor');
    } else if(userType === 'coordenador'){
      history.push('/home-coordenador')
    }
 
  }

  async function logout() {
    let msgText = 'Logout realizado com sucesso!';
    let msgType = 'sucess';

    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.push('/login');

    setFlashMessage(msgText, msgType);
  }

  return { authenticated, register, login, logout, loginProfessor, loginCoordenador, authUser };
}
