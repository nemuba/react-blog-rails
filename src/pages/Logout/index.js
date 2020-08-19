import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useToast } from '@chakra-ui/core';
import AuthContext from './../../contexts/auth';

const Logout = () => {
  const {logOut} = useContext(AuthContext);
  const toast = useToast();

  useEffect(()=>{
    const handleLogout = () =>{
      logOut();
      toast({
        title: "Logout",
        description: "Logout com sucesso!",
        position: "top-right",
        status: "info",
        duration: 9000,
        isClosable:true
      });
    }
    handleLogout();
  },[toast,logOut]);

  return <Redirect to="/"/>;
}

export default Logout;