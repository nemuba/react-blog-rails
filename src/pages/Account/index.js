import React, { useState, useContext, useEffect } from 'react';
import { Box, Container, Stack, FormControl, Input, Heading, Button, toast, useToast } from '@chakra-ui/core';
import MainLayout from './../../components/MainLayout';
import api from './../../services/api';
import AuthContext from './../../contexts/auth';

function Account() {
  const {user,loadCurrentUser } = useContext(AuthContext);
  const [form, setForm] = useState({});
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleChangeInput = (e) =>{
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }


  const handleUpdate = (e) =>{
    e.preventDefault();
    api.put(`/users/${form.id}`, {user: {...form}})
    .then((response) => {
      if(response.status === 200)
      loadCurrentUser();
      toast({
        title: "Perfil", 
        description: "Atualizado com sucesso!", 
        status: "success",
        position: "top-right", 
        duration: 2000, 
        isClosable: true
      });
    })
    .catch(error => console.log(error));
  }

  const handleChangePassword = (e) =>{
    e.preventDefault();
    api.put(`/users/${form.id}`, {user: {password}})
    .then((response) => {
      toast({
        title: "Senha", 
        description: "Atualizada com sucesso!", 
        status: "success",
        position: "top-right", 
        duration: 2000, 
        isClosable: true
      });
    })
    .catch(error => console.log(error));
  }

  useEffect(()=>{
    const {id, name, username, email} = user;
    setForm({id, name, username, email});
  },[user]);

  return(
    <MainLayout>
      <Container maxW="lg">
        <Box mt={3} p={8} border="1px solid #aaa" borderRadius="5px" maxW="960px">
          <Heading my={3}>Meu perfil</Heading>
            <form onSubmit={handleUpdate}>
            <Stack spacing={6}>
              <FormControl>
                <Input placeholder="Nome" value={form?.name} name="name" onChange={handleChangeInput}/>
              </FormControl>
              <FormControl>
                <Input placeholder="Username" value={form?.username} name="username" onChange={handleChangeInput}/>
              </FormControl>
              <FormControl>
                <Input placeholder="Email" value={form?.email} name="email" onChange={handleChangeInput}/>
              </FormControl>
              <FormControl>
                <Button variant="outline" colorScheme="green" type="submit">Atualizar</Button>
              </FormControl>        
            </Stack>  
            </form>
          <Heading mt={8} mb={4} fontSize="1.5em">Mudar senha</Heading>
          <form onSubmit={handleChangePassword}>
          <Stack spacing={6}>
            <FormControl>
              <Input 
                placeholder="Nova senha"
                name="password"
                value={password}
                type="password"
                onChange={(e)=> setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Button variant="outline" colorScheme="green" type="submit">Mudar senha</Button>
            </FormControl>
          </Stack>
          </form>        
        </Box>
      </Container>
    </MainLayout>
  );
}

export default Account;