import React from 'react';
import  {createContext} from 'react';
import { useState } from 'react';


import useAuth from '../hooks/useAuth';

const Context = createContext()


function UserProvider({children}){
    const  {authenticated, register, login, logout ,loginProfessor,loginCoordenador} = useAuth()
    const [userType, setUserType] = useState('');

    const updateUserType = (type) => {
        setUserType(type);
      };

 
    return(
        <Context.Provider value={{authenticated, register, login, logout,loginProfessor,loginCoordenador,userType, updateUserType}}>
            {children}
        </Context.Provider>

    )


  
    


}

export {Context,UserProvider}