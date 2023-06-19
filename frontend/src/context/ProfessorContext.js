import React, { createContext } from 'react';
import useAuthProfessor from '../hooks/useAuthProfessor';

export const ProfessorContext = createContext();

export const ProfessorProvider = ({ children }) => {
  const { registerProfessor } = useAuthProfessor();

  return (
    <ProfessorContext.Provider value={{ registerProfessor }}>
      {children}
    </ProfessorContext.Provider>
  );
};
