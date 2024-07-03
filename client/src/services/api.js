import axios from 'axios';
import { LOGIN,REGISTER,CREATE_TODO,GET_TODO,DELETE,MARK } from './apiConstants.js';

// form data
export const login=async (data)=>{
       return axios.post(LOGIN,data);
}


export const register=async (data)=>{
       return axios.post(REGISTER,data);
}

export const createTodo=async (data)=>{
       let token=getToken();
       return axios.post(CREATE_TODO,data,{
              headers:{
                     auth:token,
              }
       });
}

export const getTodo=async ()=>{
       let token=getToken();
      
       return axios.get(GET_TODO,{
              headers:{
                     auth:token,
              }
       });
}

export const deleteTodo=async (data)=>{
       let token=getToken();
      
       return axios.post(DELETE,data,{
              headers:{
                     auth:token,
              }
       });
}

export const markTodo=async (data)=>{
       let token=getToken();
      
       return axios.post(MARK,data,{
              headers:{
                     auth:token,
              }
       });
}



export function getToken(){
       let user=localStorage.getItem('user');
       if(!user) return;
       const userObj=JSON.parse(user);
       return userObj.token;
}
