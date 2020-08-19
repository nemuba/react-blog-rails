import React, { createContext, useState, useEffect } from 'react';
import api from './../services/api';
import { login, isAuthenticated, logout } from '../services/auth';


const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState({})
  

  const signIn = async (form) =>{
    api.post("/auth/signin", {auth: {...form}})
    .then(response=> {
      const {jwt} = response.data;
      login(jwt);
      loadCurrentUser();
    })
    .catch(e => {
      console.log(e);
    });

  }

  const logOut = ()=>{
    setUser({});
    logout();
  } 

  const loadCurrentUser = () =>{
    api.get("/auth/current_user")
    .then(response => setUser(response.data))
    .catch(error => console.log(error));
  }

  useEffect(()=>{
    if(isAuthenticated()){
      loadCurrentUser();
    }
  },[]);


  return(
    <AuthContext.Provider value={{user, signIn, logOut}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
