import React from 'react';
import { Heading, Container, Box, Text, Tag, Flex, IconButton, Image, Stack } from '@chakra-ui/core';
import { FaHome, FaHeart, FaHeartBroken, FaEdit, FaInfo} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';


const About = () => {
  
  return(
    <MainLayout>
      <Container maxW="lg">
        <Box mt={2} pl={2} maxW="960px">
          <Link to="/">
            <IconButton icon={<FaHome />} />
          </Link> / Sobre         
        </Box>
        <Box mt={8} px={8} pt={8} pb={2} maxW="960px" border="1px solid #ddd" shadow="md" borderRadius="5px">
          <Box maxW="960px" my={8} display="flex">
            <Box><FaInfo size={126} /></Box>
            <Box flex="1 1 700px" p={3} ml={3}> 
              <Heading>Sobre</Heading>
              <Text>
              Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.
              </Text>
            </Box>
          </Box>
        </Box>
      </Container>  
    </MainLayout>
  );
}

export default About;