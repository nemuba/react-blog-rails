import React, { useState, useEffect } from 'react';
import MainLayout from '../../../components/MainLayout';
import { Heading, Container, Box, Tag, IconButton, useToast, FormControl, Input, FormLabel, Stack, Button } from '@chakra-ui/core';
import { Redirect, useHistory, Link, useParams } from 'react-router-dom';
import api from '../../../services/api';
import { FaHome } from 'react-icons/fa';
import { isAuthenticated } from '../../../services/auth';

const PostEdit = () => {

  const [post, setPost] = useState({});
  const toast = useToast();
  const history = useHistory();
  const {id} = useParams();



  useEffect(()=>{
    api.get(`/posts/${id}`)
    .then(response => setPost(response.data))
    .catch(error => toast({title: "Dados não encontrados !", status:"error",isClosable: true, duration: 2000}))
  },[id, toast]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    api.put(`/posts/${id}`, {post})
      .then( response => {
        toast({
          title: "Post", 
          description: "Atualizado com sucesso", 
          status: "success", 
          duration: 2000, 
          position: "top-right", 
          isClosable:true
        });
        
        history.push(`/post/${id}`);
      })
      .catch(error => {
        toast({title: "Não foi possivel atualizar !", status:"error",isClosable: true, duration: 2000});
        history.push("/");
      });
    };


  const handleChange = (e) =>{
    const {name, value} = e.target;
    setPost({...post,[name]: value});
  }
  
  return(
    isAuthenticated() ? (
      <MainLayout>
      <Container maxW="lg">
        <Box mt={2} pl={2} maxW="960px">
          <Link to="/">
            <IconButton icon={<FaHome />} />
          </Link>
        </Box>
        <Box mt={8} px={8} pt={8} pb={2} maxW="960px" border="1px solid #aaa" shadow="md" borderRadius="5px">
          <Heading my={2}>Editar Post</Heading>
          <Tag color="blue.100" bgColor="blue.600" size="md">Autor {post?.user?.name} </Tag>
          <Tag color="red.100" bgColor="red.600" size="sm" ml={2}>Curtidas {post?.likes} </Tag>
          <Tag color="green.100" bgColor="green.600" size="sm" ml={2}>Comentários {post?.comments?.length} </Tag>
          <Box maxW="960px" mt={3} p={2}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={8}>
              <FormControl>
                <FormLabel>Titulo</FormLabel>
                <Input 
                  placeholder="Titulo" 
                  name="title" 
                  onChange={handleChange}
                  value={post?.title}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Input 
                  as="textarea" 
                  minH="300px" 
                  p={3} 
                  placeholder="Descrição" 
                  name="body" 
                  onChange={handleChange}
                  value={post?.body}
                />
              </FormControl>
              <FormControl>
                <Button variant="outline" type="submit">
                  Atualizar
                </Button>
              </FormControl>
              </Stack>
            </form>
          </Box>
        </Box>
      </Container>  
    </MainLayout>
    ) : (
      <Redirect to="/"/>
    )

  );
}

export default PostEdit;