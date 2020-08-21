import React, { createContext, useState, useEffect } from 'react';
import api from './../services/api';
import {  isAuthenticated, logout } from '../services/auth';


const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState({})

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
    <AuthContext.Provider value={{user, logOut, loadCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
