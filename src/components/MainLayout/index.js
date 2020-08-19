import React from 'react';
import Navbar from '../Navbar';
import { Container, Box } from '@chakra-ui/core';


const MainLayout = ({children}) => {
  return (
    <React.Fragment>
      <Box width="100%">
        <Navbar />
      </Box>
      <Container  maxW="lg" centerContent p={3}>
          {children}
      </Container>
    </React.Fragment>
  );
}

export default MainLayout;