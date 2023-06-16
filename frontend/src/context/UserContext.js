import  {createContext} from 'react';

import useAuth from '../hooks/UseAuth';

const Context = createContext()


function UserProvider({children}){
    const  {register } = useAuth()
    return(
        <Context.Provider value={{register}}>
            {children}
        </Context.Provider>
    )
}

export {Context,UserProvider}