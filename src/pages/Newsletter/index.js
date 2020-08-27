import React, { useRef, useState } from 'react';
import { Heading, Container, Box, Text, IconButton, FormLabel, FormControl, Stack, Button, useToast } from '@chakra-ui/core';
import { FaHome, FaNewspaper} from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import Input from './../../components/common/Input';
import MainLayout from './../../components/MainLayout';
import api from './../../services/api';

const Newsletter = () => {

  const formRef = useRef(null);
  const toast = useToast();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    const {email}  = data;
    setIsLoading(true);

    if(!email){
      formRef.current.setErrors({email: "Preencha o campo"});
      toast({
        title: "Newsletter",
        description:"Preencha o campo",
        status: "error",
        position: "top-right",
        duration: 2000,
        isClosable:true
      });
      setIsLoading(false);
    }else{
      await api.post('/contacts', {contact: {email}})
               .then(response => {
                 if(response.status === 201){
                  toast({
                    title: "Newsletter",
                    description:"Cadastro concluido, verifique seu email !",
                    status: "success",
                    position: "top-right",
                    duration: 2000,
                    isClosable:true
                  });
                  history.push("/");
                  setIsLoading(false);
                 }else if(response.status === 200){
                  toast({
                    title: "Newsletter",
                    description: response.data.join(", "),
                    status: "error",
                    position: "top-right",
                    duration: 2000,
                    isClosable:true
                  });
                  setIsLoading(false);  
                 }
                 setIsLoading(false);
               })
               .catch(error=> {
                 console.log(error);
                 setIsLoading(false);
                });
    }
  }
  return(
    <MainLayout>
      <Container maxW="lg">
        <Box mt={2} pl={2} maxW="960px">
          <Link to="/">
            <IconButton icon={<FaHome />} />
          </Link> / Newsletter          
        </Box>
        <Box maxW="960px" my={8} display="flex" border="1px solid #ddd" shadow="md" borderRadius="5px" p={5} flexWrap="wrap" justifyContent="center">
            <Box maxW="200px">
              <FaNewspaper size={126} />
            </Box>
            <Box flex="1 1 700px" p={3} ml={3}> 
              <Heading color="blue.500">Newsletter</Heading>
              <Heading size="md" mt={5}>
                Quer ficar por dentro de tudo ?
              </Heading>
              <Text mt={3}>
                É fácil , cadastre o seu melhor email e fique por dentro de todas as novidades aqui do blog.
              </Text>
              <Box maxW="700px" mt={8}>
                <Heading size="md">Preencha seu Email</Heading>
                <Form onSubmit={handleSubmit} ref={formRef}>
                <Stack spacing={6} my={3}>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" name="email" placeholder="Seu melhor email"/>
                  </FormControl>
                  <FormControl>
                    <Button 
                      variant="outline" 
                      colorScheme="blue" 
                      float="right"
                      type="submit"
                      isLoading={isLoading}
                    >
                      Enviar
                    </Button>
                  </FormControl>
                </Stack>
                </Form>
              </Box>
            </Box>
          </Box>
      </Container>  
    </MainLayout>
  );
}

export default Newsletter;