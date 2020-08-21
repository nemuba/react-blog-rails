import React from 'react';
import { Heading, Container, Box, Text, IconButton, FormLabel, Input, FormControl, Stack, Button } from '@chakra-ui/core';
import { FaHome, FaNewspaper} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';


const Newsletter = () => {
  
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
                <Stack spacing={6} my={3}>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="Seu melhor email"/>
                  </FormControl>
                  <FormControl>
                    <Button variant="outline" colorScheme="blue" float="right">Enviar</Button>
                  </FormControl>
                </Stack>
              </Box>
            </Box>
          </Box>
      </Container>  
    </MainLayout>
  );
}

export default Newsletter;