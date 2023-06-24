import React, { createContext } from 'react';
import { useState } from 'react';
import useDisciplina from '../hooks/useDisciplina';



const DisciplinaContext = createContext()


function DisciplinaProvider({children}){
    const  {authenticated,createDisciplina} = useDisciplina()
    const [userType, setUserType] = useState('');
 
    const updateUserType = (type) => {
        setUserType(type);
      };



    return(
        <DisciplinaContext.Provider value={{authenticated,createDisciplina,userType, updateUserType}}>
            {children}
        </DisciplinaContext.Provider>

    )


  
    


}

export {DisciplinaContext,DisciplinaProvider}