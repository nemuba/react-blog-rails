import React from 'react';
import {
  ChakraProvider,
  CSSReset,
} from '@chakra-ui/core';
import theme from '@chakra-ui/theme';
import Routes from './routes';
import { AuthProvider } from './contexts/auth';

const themeDefault = theme;

themeDefault.config = {
  initialColorMode: "dark",
  useSystemColorMode: true
};

function App() {
  
  return (
    <ChakraProvider theme={themeDefault}>
      <CSSReset />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
