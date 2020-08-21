import React, { useState , useContext } from 'react';
import { Container, Box, Stack, Input, FormControl, FormLabel, Heading, Button } from '@chakra-ui/core';
import {Link, useHistory} from 'react-router-dom';
import { useToast } from '@chakra-ui/core';
import MainLayout from '../../components/MainLayout';
import {isAuthenticated, login} from './../../services/auth';
import { Redirect } from 'react-router-dom';
import api from '../../services/api';
import AuthContext from './../../contexts/auth';

const SignIn = () => {

  const [form, setForm] = useState({email: "", password: ""});
  const toast = useToast();
  const history = useHistory();
  const {loadCurrentUser} = useContext(AuthContext);  

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const {email,password} = form;
    
    if(!email || !password){
      toast({
        title: "Login",
        description: "Email ou senha inválidos",
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true
      });
    }else{
      api.post("/auth/signin", {auth: {...form}})
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
        loadCurrentUser();
      });
    }
  }

  const handleChangeInput = (e) =>{
    const {id, value} = e.target;
    setForm({...form, [id]: value});
  }


  return( !isAuthenticated() ?
    (<MainLayout>
      <Container maxW="md">
        <Box mt={3} p={6} shadow="md" borderWidth="1px" bg="blue"  borderRadius="5px">
          <form onSubmit={handleSubmit}>
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
                  value={form.email} 
                  id="email"
                  onChange={handleChangeInput}
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
                  value={form.password} 
                  id="password"
                  onChange={handleChangeInput}
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
          </form>
        </Box>
      </Container>
    </MainLayout>
    ) : <Redirect to="/" />  );
}

export default SignIn;