import React from 'react';
import Navbar from '../Navbar';
import { Container } from '@chakra-ui/core';


const MainLayout = ({children}) => {
  return (
    <React.Fragment>
      <Navbar />
      <Container  maxW="lg" centerContent p={3}>
          {children}
      </Container>
    </React.Fragment>
  );
}

export default MainLayout;