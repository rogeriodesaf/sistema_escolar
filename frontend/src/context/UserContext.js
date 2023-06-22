import React from 'react';
import  {createContext} from 'react';


import useAuth from '../hooks/useAuth';

const Context = createContext()


function UserProvider({children}){
    const  {authenticated, register, login, logout ,loginProfessor,loginCoordenador} = useAuth()
 
    return(
        <Context.Provider value={{authenticated, register, login, logout,loginProfessor,loginCoordenador}}>
            {children}
        </Context.Provider>

    )


  
    


}

export {Context,UserProvider}