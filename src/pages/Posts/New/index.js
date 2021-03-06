import React, { useState, useContext, useEffect, useRef } from 'react';
import MainLayout from '../../../components/MainLayout';
import { Heading, Container, Box, Tag, IconButton, useToast, FormControl, FormLabel, Stack, Button } from '@chakra-ui/core';
import { Redirect, useHistory, Link } from 'react-router-dom';
import api from '../../../services/api';
import { FaHome } from 'react-icons/fa';
import { isAuthenticated } from '../../../services/auth';
import AuthContext from './../../../contexts/auth';
import { Form } from '@unform/web';
import Input from './../../../components/common/Input';
import Select from './../../../components/common/Select';


const PostNew = () => {

 
  const [categories, setCategories] = useState([]);
  const toast = useToast();
  const history = useHistory();
  const {user} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);


  const handleSubmit = async (data) =>{
    const {title, body, category_ids} = data;
    setIsLoading(true);

    console.log(data);

    if(!category_ids.length || !title || !body){

      formRef.current.setErrors({
        title: !title ? 'Titulo requerido' : '',
        body: !body ? 'Descrição requerida' : '',
        category_ids: !category_ids.length ? 'Selecione': ''
      });

      setIsLoading(false);
    }else{
    await api.post(`/posts`, {post: {...data }})
      .then( response => {
        if(response.status === 201){
          toast({
            title: "Post", 
            description: "Criado com sucesso", 
            status: "success", 
            duration: 2000, 
            position: "top-right", 
            isClosable:true
          });
          setIsLoading(false);
          history.push(`/post/${response.data.id}`);
        }else if(response.status === 200){
          toast({
            title: "Post", 
            description: response.data.join(", "), 
            status: "error", 
            duration: 2000, 
            position: "top-right", 
            isClosable:true
          });
          setIsLoading(false);
        }
      })
      .catch(() => {
        toast({title: "Dados não encontrados !", status:"error",isClosable: true, duration: 2000});
        history.push("/");
        setIsLoading(false);
      });
    }
    };

 

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
            <Form onSubmit={handleSubmit} ref={formRef}>
              <Stack spacing={6}>              
              <FormControl>
                <FormLabel>Categorias</FormLabel>
                <Select 
                  name="category_ids" 
                  isMulti options={categories?.map(c=>({value: c.id, label: c.description})) } 
                />
              </FormControl>
              <FormControl>
                <FormLabel>Titulo</FormLabel>
                <Input 
                  placeholder="Titulo" 
                  name="title" 
                />
              </FormControl>
              <FormControl>
                <FormLabel>Descrição: Escreva utilizando markdown</FormLabel>
                <Input 
                  as="textarea" 
                  minH="300px" 
                  p={3} 
                  placeholder="# Titulo" 
                  name="body" 
                />
              </FormControl>
              <FormControl>
                <Button variant="outline" type="submit" colorScheme="blue" isLoading={isLoading}>
                  Criar
                </Button>
              </FormControl>
              </Stack>
            </Form>
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