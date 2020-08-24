import React, { useEffect } from 'react';
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
  useEffect(()=> console.log(themeDefault),[]);
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
