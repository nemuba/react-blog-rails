import React , {useRef, useState} from 'react';
import { Container, Box, Stack, FormControl, FormLabel, Heading, Button, useToast } from '@chakra-ui/core';
import { Link, useHistory } from 'react-router-dom';
import api from './../../services/api';
import MainLayout from '../../components/MainLayout';
import { Form } from '@unform/web';
import Input from './../../components/common/Input';

const SignUp = () => {

  const toast = useToast();
  const history = useHistory();
  const formRef = useRef(null);
  const [isLoading, setIsLoading] =  useState(false);

  const handleSubmit = async (data) =>{
    setIsLoading(true);
    const {name, username, email, password, password_confirmation } = data;
    const validate = [name,username, email, password, password_confirmation];

    if(validate.includes("")){
      toast({
        title:"Validação", 
        description: "Preencha todos os campos", 
        status:"error", 
        position: "top-right",
        isClosable: true, 
        duration: 2000
      });
      formRef.current.setErrors({
        name: !name ? 'Nome requerido' : '', 
        username: !username ? 'Nome de usuário' : '', 
        email: !name ? 'Email requerido' : '', 
        password: !password ? 'Senha requerida' : '', 
        password_confirmation: !password_confirmation ? 'Confirmar senha requerida' : ''
      });
      setIsLoading(false);
    }else{
      if(password !== password_confirmation){
        toast({
          title:"Confirmação de Senha", 
          description: "A senha precisa ser igual", 
          status:"error", 
          position: "top-right",
          isClosable: true, 
          duration: 2000
        });
        setIsLoading(false)
      }else{
      await api.post("/auth/signup",{user: {...data}})
      .then((resp)=>{
        if(resp.status === 201){
          toast({
            title: "Sign Up",
            description: "Conta criada com sucesso !",
            status: "success",
            duration: 2000,
            position: "top-right",
            isClosable: true
          });
          history.push('/signin');
        }else if(resp.status === 200){
          toast({
            title: "Erro ao criar conta",
            description: resp.data.join(", "),
            status: "error",
            duration: 2000,
            position: "top-right",
            isClosable: true
          });
        }
      })
      .catch(()=> {
        toast({
          title: "Não foi possivel criar a conta!",
          status:"error", 
          duration: 2000, 
          isClosable:true, 
          position:"top-right"
        })
      }).finally(()=> setIsLoading(false));
    }
    }
  }

  return(
    <MainLayout>
      <Container maxW="md">
        <Box mt={3} p={6} shadow="md" borderWidth="1px" bg="blue" borderRadius="5px">
          <Form onSubmit={handleSubmit} ref={formRef}>
            <Box my={5} display="flex" justifyContent="start">
              <Heading>Criar conta</Heading>
            </Box>
            <Stack spacing={8} mt={8}>
              <FormControl>
                <FormLabel>
                  Nome
                </FormLabel>
                <Input 
                  placeholder="Nome" 
                  name="name" 
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  Username
                </FormLabel>
                <Input 
                  placeholder="Username" 
                  name="username" 
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  Email
                </FormLabel>
                <Input 
                  placeholder="Email" 
                  name="email"
                  type="email"
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  Senha
                </FormLabel>
                <Input 
                  placeholder="Senha" 
                  name="password" 
                  type="password"
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  Confirme a Senha
                </FormLabel>
                <Input 
                  placeholder="Confirme a Senha" 
                  name="password_confirmation" 
                  type="password"
                />
              </FormControl>
            </Stack>
            <Box display="flex" justifyContent="space-between">
              <Box mt={10} alignSelf="flex-end">
              <Link to="/signin">
                Login
              </Link>
              </Box>
              <Button 
                type="submit"
                variant="outline"
                mt={8}
                size="md"
                colorScheme="blue" 
                isLoading={isLoading}
                >
                Criar
              </Button>
            </Box>
          </Form>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default SignUp;