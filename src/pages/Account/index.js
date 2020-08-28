import React, { useContext, useEffect, useRef } from 'react';
import { Box, Container, Stack, FormControl, Heading, Button, useToast } from '@chakra-ui/core';
import { Form } from '@unform/web';
import MainLayout from './../../components/MainLayout';
import api from './../../services/api';
import { logout } from './../../services/auth';
import AuthContext from './../../contexts/auth';
import Input from './../../components/common/Input';
import Dialog from './../../components/Dialog';
import { useHistory } from 'react-router-dom';

function Account() {
  const {user,loadCurrentUser } = useContext(AuthContext);
  const toast = useToast();
  const formRef = useRef(null);
  const formRefPassword = useRef(null);
  const history = useHistory();
  
  const handleUpdate = async (data) =>{
    const {id, name, username, email} = data;
    if(!name || !username || !email){
      formRef.current.setErrors({
        name: !name ? 'Nome requerido' : '',
        username: !username ? 'Nome de usuário requerido' : '',
        email: !email ? 'Email requerido' : '',
      });
    }else{
    await api.put(`/users/${id}`, {user: {...data}})
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
    .catch(() => {
      toast({
        title: "Perfil", 
        description: "Não foi possivel atualizar", 
        status: "error",
        position: "top-right", 
        duration: 2000, 
        isClosable: true
      });
    });
  }
  }

  const handleChangePassword = async (data, {reset}) =>{
    const {id, password } = data;

    if(!password){
      formRefPassword.current.setErrors({
        password: 'Senha requerida'
      });
    }else{
    await api.put(`/users/${id}`, {user: {password}})
    .then((response) => {
      if(response.status === 202){
        toast({
          title: "Senha", 
          description: "Atualizada com sucesso!", 
          status: "success",
          position: "top-right", 
          duration: 2000, 
          isClosable: true
        });
      }else{
        toast({
          title: "Senha", 
          description: "Não foi possivel atualizar", 
          status: "error",
          position: "top-right", 
          duration: 2000, 
          isClosable: true
        });
      }
    })
    .catch(() => {
      toast({
        title: "Senha", 
        description: "Não foi possivel atualizar", 
        status: "error",
        position: "top-right", 
        duration: 2000, 
        isClosable: true
      });
    });
  }
  }

  const handleDeleteAccount = async (id) => {
    await api.delete(`/users/${id}`)
    .then(response=> {
      if(response.status === 204){
      toast({
        title: "Conta", 
        description: "Conta excluida !", 
        status: "success",
        position: "top-right", 
        duration: 2000, 
        isClosable: true
      });
      logout();
      history.push("/");
    }
    })
    .catch(()=>{
      toast({
        title: "Conta", 
        description: "Não foi possivel excluir conta", 
        status: "error",
        position: "top-right", 
        duration: 2000, 
        isClosable: true
      });
    })
  }

  useEffect(()=>{
    const {id, name, username, email} = user;
    formRef.current.setData({id, name, username, email});
    formRefPassword.current.setData({id});
  },[user]);

  return(
    <MainLayout>
      <Container maxW="lg">
        <Box mt={3} p={8} border="1px solid #aaa" borderRadius="5px" maxW="960px">
          <Heading my={3}>Meu perfil</Heading>
            <Form onSubmit={handleUpdate} ref={formRef}>
            <Stack spacing={6}>
            <FormControl hidden>
                <Input 
                  placeholder="Id" 
                  name="id" 
                  as="hidden"
                />
              </FormControl>
              <FormControl>
                <Input 
                  placeholder="Nome" 
                  name="name" 
                />
              </FormControl>
              <FormControl>
                <Input 
                  placeholder="Username" 
                  name="username" 
                />
              </FormControl>
              <FormControl>
                <Input 
                  placeholder="Email" 
                  name="email" 
                />
              </FormControl>
              <FormControl>
                <Button variant="outline" colorScheme="green" type="submit">Atualizar</Button>
              </FormControl>        
            </Stack>  
            </Form>
          <Heading mt={8} mb={4} fontSize="1.5em">Mudar senha</Heading>
          <Form onSubmit={handleChangePassword} ref={formRefPassword}>
          <Stack spacing={6}>
            <FormControl hidden>
              <Input 
                placeholder="Id" 
                name="id" 
                as="hidden"
              />
            </FormControl>
            <FormControl>
              <Input 
                placeholder="Nova senha"
                name="password"
                type="password"
              />
            </FormControl>
            <FormControl>
              <Button variant="outline" colorScheme="green" type="submit">Mudar senha</Button>
            </FormControl>
          </Stack>
          </Form>

          <Heading  mt={8} mb={4} fontSize="1.0em">Excluir minha conta</Heading>
          <Dialog 
            title="Excluir minha Conta" 
            handleDelete={handleDeleteAccount}
            colorSchema="red.300"
            id={user.id} 
          />  
        </Box>
      </Container>
    </MainLayout>
  );
}

export default Account;