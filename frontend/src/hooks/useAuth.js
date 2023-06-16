import api from "../utils/api";

import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';


export default function useAuth(){
    async function register(formData){
        try{
            const data = await api.post('/api/auth/students/register',formData).then((response)=>{
                return response.data
            })
            } catch(err){
                  console.log(err)
            }
        console.log(data)
    }

    return {register}
}