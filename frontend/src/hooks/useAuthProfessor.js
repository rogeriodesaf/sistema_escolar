import api from "../utils/api";

import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import useFlashMessage from './useFlashMessage';

export default function useAuthProfessor() {
  const [authenticated , setAuthenticated] = useState(false)
  const {setFlashMessage} = useFlashMessage()
  const history = useHistory()

  useEffect(()=>{

    const token = localStorage.getItem('token')
    if(token){
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
        setAuthenticated(true) 
    }
},[]);


    async function registerProfessor(user){

        const {setFlashMessage} = useFlashMessage()

        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'sucess'



    try {
      const response = await api.post('/api/auth/professors/register', user);
      console.log(response.data);
    } catch(error){
                 
      msgText = error.response.data.error
      msgType = 'error'
                   
         }
     setFlashMessage(msgText,msgType)   
 
 }

 async function loginProfessor(user){
  const {setFlashMessage} = useFlashMessage()

  let msgText = 'Login realizado com sucesso!'
  let msgType = 'sucess'

  
  

  try {
      const data = await api.post('/api/auth/professors/login',user).then((response)=>{
          return response.data
      })
      console.log(data)
      await authUser(data)
  } catch (error) {
      msgText = error.response.data.error
          msgType = 'error'
  }
   setFlashMessage(msgText,msgType)  
}

async function authUser(data){
  setAuthenticated(true)
  localStorage.setItem('token', JSON.stringify(data.token))

  history.push('/')
}

async function logoutProfessor(){
        
  let msgText = 'Logout realizado com sucesso!'
  let msgType = 'sucess'

  setAuthenticated(false)
  localStorage.removeItem('token')
  api.defaults.headers.Authorization = undefined
  history.push('/')

  setFlashMessage(msgText,msgType)  
}

  

  return { authenticated,registerProfessor , loginProfessor,logoutProfessor };
}


