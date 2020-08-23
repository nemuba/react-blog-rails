import React, { useContext, useRef } from 'react';
import { Container, Box, Stack, FormControl, FormLabel, Heading, Button } from '@chakra-ui/core';
import {Link, useHistory} from 'react-router-dom';
import { useToast } from '@chakra-ui/core';
import MainLayout from '../../components/MainLayout';
import {isAuthenticated, login} from './../../services/auth';
import { Redirect } from 'react-router-dom';
import api from '../../services/api';
import AuthContext from './../../contexts/auth';
import {Form} from '@unform/web';
import Input from './../../components/common/Input';

const SignIn = () => {

  const formRef = useRef(null);
  const toast = useToast();
  const history = useHistory();
  const {loadCurrentUser} = useContext(AuthContext);  

  const handleSubmit = async (data) =>{
  
    const {email,password} = data;
    
    if(!email || !password){
      toast({
        title: "Login",
        description: "Preencha todos os campos",
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true
      });
      formRef.current.setFieldError('email', !email ? 'Email requerido.' : '');
      formRef.current.setFieldError('password', !password ? 'Senha requirida.' : '');
    }else{
      await api.post("/auth/signin", {auth: {...data}})
      .then(resp => {
        if(resp.status === 201){
          login(resp.data.jwt);
          history.push("/");
          toast({
            title: "Login",
            description: "Logado com sucesso",
            status: "success",
            position: "top-right",
            duration: 9000,
            isClosable: true
          });
        }else{
          console.log(resp);
        }
      })
      .catch(()=>{
        toast({
          title: "Login",
          description: "Email ou senha inválidos",
          status: "error",
          position: "top-right",
          duration: 9000,
          isClosable: true
        });
      }).finally(()=>{
        if(isAuthenticated()) loadCurrentUser();
      });
    }
  }

  return( !isAuthenticated() ?
    (<MainLayout>
      <Container maxW="md">
        <Box mt={3} p={6} shadow="md" borderWidth="1px" bg="blue"  borderRadius="5px">
          <Form onSubmit={handleSubmit} ref={formRef}>
            <Box my={5} display="flex" justifyContent="start">
              <Heading>Login</Heading>
            </Box>
            <Stack spacing={8} mt={8}>
              <FormControl>
                <FormLabel>
                  Email
                </FormLabel>
                <Input 
                  type="email"
                  placeholder="Email" 
                  title="Email" 
                  name="email"
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  Senha
                </FormLabel>
                <Input 
                  type="password"
                  placeholder="Senha" 
                  title="Senha" 
                  name="password"
                />
              </FormControl>
            </Stack>
            <Box display="flex" justifyContent="space-between">
              <Box mt={10} alignSelf="flex-end">
              <Link to="/signup">
                Criar conta
              </Link>
              </Box>
              <Button 
                mt={8}
                size="md"
                colorScheme="blue" 
                type="submit"
                >
                Login
              </Button>
            </Box>
          </Form>
        </Box>
      </Container>
    </MainLayout>
    ) : <Redirect to="/" />  );
}

export default SignIn;