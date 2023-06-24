import api from "../utils/api";

import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import useFlashMessage from './useFlashMessage';


export default function useDisciplina(){ 
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

    async function createDisciplina(disciplina){

        const {setFlashMessage} = useFlashMessage()

        let msgText = 'Disciplina cadastrada com sucesso!'
        let msgType = 'sucess'

        try{
            const data = await api.post('/api/disciplinas', disciplina).then((response) => {
                return response.data;
              });
           
            await authUser(data);
            console.log(data);
          } catch (error) {
            msgText = error.response.data.error;
            msgType = 'error';
          }
        
          setFlashMessage(msgText, msgType);
        }





    async function loginProfessor(user) {
        const { setFlashMessage } = useFlashMessage();
      
        let msgText = 'Login realizado com sucesso!';
        let msgType = 'success';
      
        try {
          const data = await api.post('/api/auth/professors/login', user).then((response) => {
            return response.data;
          });
      
          await authUser(data);
          console.log(data);
        } catch (error) {
          msgText = error.response.data.error;
          msgType = 'error';
        }
      
        setFlashMessage(msgText, msgType);
      }
      
      async function loginCoordenador(user) {
        const { setFlashMessage } = useFlashMessage();
      
        let msgText = 'Login realizado com sucesso!';
        let msgType = 'success';
      
        try {
          const data = await api.post('/api/auth/coordenador/login', user).then((response) => {
            return response.data;
          });
      
          await authUser(data);
          console.log(data);
        } catch (error) {
          msgText = error.response.data.error;
          msgType = 'error';
        }
      
        setFlashMessage(msgText, msgType);
      }
      



    async function login(user,userType){
      

        const {setFlashMessage} = useFlashMessage()

        let msgText = 'Login realizado com sucesso!'
        let msgType = 'sucess'

        
        let data;

        try {
           
                if(userType ==='aluno'){
                   const data = await api.post('/api/auth/students/login',user).then((response)=>{
                        return response.data
                    })
                    console.log(data)
                    await authUser(data)
                  
                    ///console.log(data)
                   /// await authUser(data)

                } else if (userType ==='professor') {
                    loginProfessor(user)
                    } else if (userType ==='coordenador') {
                      loginCoordenador(user)
                      }
             
           
                
            }
        
         catch (error) {
            msgText = error.response.data.error
                msgType = 'error'
        }
         setFlashMessage(msgText,msgType)  
    };

    async function authUser(data){
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))

        history.push('/home')
    }

    async function logout(){
        
        let msgText = 'Logout realizado com sucesso!'
        let msgType = 'sucess'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        history.push('/login')

        setFlashMessage(msgText,msgType)  
    }

    
      
      

    return {authenticated, createDisciplina, login, logout,loginProfessor,loginCoordenador}
}