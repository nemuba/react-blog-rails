import React , {useState} from 'react';
import { Container, Box, Stack, Input, FormControl, FormLabel, Heading, Button, useToast } from '@chakra-ui/core';
import { Link, useHistory } from 'react-router-dom';
import api from './../../services/api';
import MainLayout from '../../components/MainLayout';


const SignUp = () => {

  const [form, setForm] = useState({name: "", username: "", email: "", password:"", password_confirmation:"" });
  const toast = useToast();
  const history = useHistory();


  const handleChangeInput = (e) =>{
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const {name, username, email, password, password_confirmation } = form;
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
    }else{
      api.post("/auth/signup",{user: {...form}})
      .then(()=>history.push('/signin'))
      .catch(()=> toast({title: "Não foi possivel criar a conta!",status:"error", duration: 2000, isClosable:true, position:"top-right"}))
    }
  }

  return(
    <MainLayout>
      <Container maxW="md">
        <Box mt={3} p={6} shadow="md" borderWidth="1px" bg="blue" borderRadius="5px">
          <form onSubmit={handleSubmit}>
            <Box my={5} display="flex" justifyContent="start">
              <Heading>Criar conta</Heading>
            </Box>
            <Stack spacing={8} mt={8}>
              <FormControl>
                <FormLabel>
                  Nome
                </FormLabel>
                <Input onChange={handleChangeInput} placeholder="Nome" name="name" value={form?.name}/>
              </FormControl>
              <FormControl>
                <FormLabel>
                  Username
                </FormLabel>
                <Input onChange={handleChangeInput} placeholder="Username" name="username" value={form?.username}/>
              </FormControl>
              <FormControl>
                <FormLabel>
                  Email
                </FormLabel>
                <Input onChange={handleChangeInput} placeholder="Email" name="email" value={form?.email}/>
              </FormControl>
              <FormControl>
                <FormLabel>
                  Senha
                </FormLabel>
                <Input 
                  onChange={handleChangeInput} 
                  placeholder="Senha" 
                  name="password" 
                  value={form?.password}
                  type="password"
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  Confirme a Senha
                </FormLabel>
                <Input 
                  onChange={handleChangeInput} 
                  placeholder="Confirme a Senha" 
                  name="password_confirmation" 
                  value={form?.password_confirmation} 
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
                mt={8}
                size="md"
                colorScheme="blue" 
                >
                Criar
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default SignUp;