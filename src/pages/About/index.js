import React from 'react';
import { Heading, Container, Box, Text, Tag, Flex, IconButton } from '@chakra-ui/core';
import { FaHome, FaHeart, FaHeartBroken, FaEdit} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';


const About = () => {
  
  return(
    <MainLayout>
      <Container maxW="lg">
        <Box mt={2} pl={2} maxW="960px">
          <Link to="/">
            <IconButton icon={<FaHome />} />
          </Link>          
        </Box>
        <Box mt={8} px={8} pt={8} pb={2} maxW="960px" border="1px solid #ddd" shadow="md" borderRadius="5px">
          <Heading my={2}>React Blog - About</Heading>
          <Box maxW="960px" mt={3}>
            <Text> Lorem </Text>
          </Box>
        </Box>
      </Container>  
    </MainLayout>
  );
}

export default About;