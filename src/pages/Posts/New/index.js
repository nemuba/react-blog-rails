import React, { useState, useContext, useEffect } from 'react';
import MainLayout from '../../../components/MainLayout';
import { Heading, Container, Box, Tag, IconButton, useToast, FormControl, Input, FormLabel, Stack, Button } from '@chakra-ui/core';
import { Redirect, useHistory, Link } from 'react-router-dom';
import api from '../../../services/api';
import { FaHome } from 'react-icons/fa';
import { isAuthenticated } from '../../../services/auth';
import AuthContext from './../../../contexts/auth';
import Categories from '../../../components/Categories';

const PostNew = () => {

  const [post, setPost] = useState({});
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const toast = useToast();
  const history = useHistory();
  const {user} = useContext(AuthContext);

  

  const handleSubmit = (e) =>{
    e.preventDefault();
    api.post(`/posts`, {post: {...post, category_ids:[category]}})
      .then( response => {
        setPost(response.data);
        toast({
          title: "Post", 
          description: "Criado com sucesso", 
          status: "success", 
          duration: 2000, 
          position: "top-right", 
          isClosable:true
        });
        
        history.push(`/post/${response.data.id}`);
      })
      .catch(error => {
        toast({title: "Dados não encontrados !", status:"error",isClosable: true, duration: 2000});
        history.push("/");
      });
    };


  const handleChange = (e) =>{
    const {name, value} = e.target;
    setPost({...post,[name]: value});
  }

  useEffect(()=>{
    const loadCategories = () =>{
      api.get("/categories")
      .then(resp =>{
        if(resp.status === 200){
          setCategories(resp.data.categories);
        }
      })
      .catch(erro =>{
        console.log(erro);
      });
    }
    loadCategories();
  },[]);
  
  return(
    isAuthenticated() ? (
      <MainLayout>
      <Container maxW="lg">
        <Box mt={2} pl={2} maxW="960px">
          <Link to="/">
            <IconButton icon={<FaHome />} />
          </Link> / Novo Post
        </Box>
        <Box mt={8} px={8} pt={8} pb={2} maxW="960px" border="1px solid #ddd" shadow="md" borderRadius="5px">
          <Heading my={2}>Criar Post</Heading>
          <Tag color="blue.100" bgColor="blue.600" size="md">Autor {user?.name} </Tag>
          <Box maxW="960px" mt={3} p={2}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={6}>              
              {categories.length ? (<Categories categories={categories} setCategory={setCategory}/>) : null}
              <FormControl>
                <FormLabel>Titulo</FormLabel>
                <Input 
                  placeholder="Titulo" 
                  name="title" 
                  onChange={handleChange}
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
                />
              </FormControl>
              <FormControl>
                <Button variant="outline" type="submit" colorScheme="blue">
                  Criar
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

export default PostNew;