import api from "../utils/api";

import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';


export default function useAuth(){
    async function register(user){
        try{
            const data = await api.post('/api/auth/students/register',user).then((response)=>{
                return response.data
            })
            console.log(data)
            } catch(err){
                  console.log(err)
            }
     
    }

    return {register}
}