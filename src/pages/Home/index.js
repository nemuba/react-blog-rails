import React from 'react';
import MainLayout from '../../components/MainLayout';
import { Heading, Container } from '@chakra-ui/core';
import Posts from './../../components/Posts';


const Home = () => {
  
  return(
    <MainLayout>
      <Container maxW="lg">
        <Heading m={3} fontSize="1.5em">Ultímos Posts</Heading>    
        <Posts />
      </Container>  
      
    </MainLayout>
  );
}

export default Home;