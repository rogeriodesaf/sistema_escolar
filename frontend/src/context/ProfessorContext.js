import React, { createContext } from 'react';
import useAuthProfessor from '../hooks/useAuthProfessor';



const ProfessorContext = createContext()


function ProfessorProvider({children}){
    const  {authenticated,registerProfessor,registerCoordenador} = useAuthProfessor()
 
    return(
        <ProfessorContext.Provider value={{authenticated,registerProfessor,registerCoordenador}}>
            {children}
        </ProfessorContext.Provider>

    )


  
    


}

export {ProfessorContext,ProfessorProvider}