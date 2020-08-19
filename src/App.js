import React from 'react';
import {
  ChakraProvider,
  CSSReset,
} from '@chakra-ui/core';
import theme from '@chakra-ui/theme';
import Routes from './routes';
import { AuthProvider } from './contexts/auth';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
