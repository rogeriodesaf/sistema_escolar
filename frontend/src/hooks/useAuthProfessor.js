import api from "../utils/api";
import { useState } from 'react';

function useAuthProfessor() {
  const registerProfessor = async (user) => {
    try {
      const response = await api.post('/api/auth/professors/register', user);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return { registerProfessor };
}

export default useAuthProfessor;
