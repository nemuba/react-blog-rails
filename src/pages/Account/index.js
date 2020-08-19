import React, { useState, useEffect } from 'react';
import MainLayout from './../../components/MainLayout';
import { Box, Container, Stack, FormControl, Input, Heading, Button } from '@chakra-ui/core';
import api from './../../services/api';

function Account() {
  const [user, setUser] = useState({});

  useEffect(()=>{
    const loadUser = () =>{
      api.get("/auth/current_user")
      .then(response => setUser(response.data))
      .catch(error => console.log(error))
    }
    loadUser();
  },[]);

  return(
    <MainLayout>
      <Container maxW="lg">
        <Box mt={3} p={8} border="1px solid #aaa" borderRadius="5px" maxW="960px">
          <Heading my={3}>Meu perfil</Heading>
          <Stack spacing={6}>
            <FormControl>
              <Input placeholder="Nome" value={user?.name}/>
            </FormControl>
            <FormControl>
              <Input placeholder="Username" value={user?.username}/>
            </FormControl>
            <FormControl>
              <Input placeholder="Email" value={user?.email}/>
            </FormControl>        
          </Stack>  
          <Heading mt={8} mb={4} fontSize="1.5em">Mudar senha</Heading>
          <Stack spacing={6}>
            <FormControl>
              <Input placeholder="Nova senha" />
            </FormControl>
            <FormControl>
              <Button variant="outline">Mudar senha</Button>
            </FormControl>
          </Stack>        
        </Box>
      </Container>
    </MainLayout>
  );
}

export default Account;