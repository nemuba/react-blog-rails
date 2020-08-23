import React, { useState, useEffect, useRef } from 'react';
import MainLayout from '../../../components/MainLayout';
import { Flex, Heading, Container, Box, Tag, IconButton, useToast, FormControl, FormLabel, Stack, Button } from '@chakra-ui/core';
import { Redirect, useHistory, Link, useParams } from 'react-router-dom';
import api from '../../../services/api';
import { FaHome } from 'react-icons/fa';
import { isAuthenticated } from '../../../services/auth';
import Loading from 'react-loading';
import { Form } from '@unform/web';
import Input from './../../../components/common/Input';
import Select from './../../../components/common/Select';


const PostEdit = () => {

  const [post, setPost] = useState({});
  const [categories, setCategories] = useState([]);
  const toast = useToast();
  const history = useHistory();
  const {id} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(()=>{
    const getPost = () =>{
      api.get(`/posts/${id}`)
    .then(response => {
      if(response.status === 200){
        const {id, title, body} = response.data;
        console.log(response.data.categories.map(c=> c.id));
        const category_ids = response.data.categories.map(c=>({value: c.id, label: c.description}));
        setPost({...response.data, defaultCategory: category_ids});

        formRef.current.setData({
          id: id,
          title: title,
          body: body,
          category_ids: category_ids,
        });

      }
    })
    .catch(() => {
      toast({
        title: "Dados não encontrados !", 
        status:"error",
        isClosable: true, 
        duration: 2000
      })
    });
    }
    getPost();
  },[id, toast]);


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

  const handleSubmit = async (data) =>{
    const {id, title, body, category_ids} = data;
    setIsLoading(true);

    if(!title || !body || !category_ids.length){
      formRef.current.setErrors({
        title: !title ? 'Titulo requerido' : '',
        body: !body ? 'Descrição requerida' : '',
        category_ids: !category_ids.length ? 'Selecione' : '',
      });
      setIsLoading(false);
    }else{

    await api.put(`/posts/${id}`, {post: {...data}})
      .then( response => {
        if(response.status === 202){
          toast({
            title: "Post", 
            description: "Atualizado com sucesso", 
            status: "success", 
            duration: 2000, 
            position: "top-right", 
            isClosable:true
          });
          setIsLoading(false);
          history.push(`/post/${id}`);
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
        setIsLoading(false);
        toast({title: "Não foi possivel atualizar !", status:"error",isClosable: true, duration: 2000});
        history.push(`/post/${id}`);
      });
    }
    };


  
  return(
    isAuthenticated() ? (
      <MainLayout>
      <Container maxW="lg">
        <Box mt={2} pl={2} maxW="960px">
          <Link to="/">
            <IconButton icon={<FaHome />} />
          </Link> / Editar Post
        </Box>
        {post?.title != null ? (
        <Box mt={8} px={8} pt={8} pb={2} maxW="960px" border="1px solid #ddd" shadow="md" borderRadius="5px">
          <Heading my={2}>Editar Post</Heading>
          <Tag color="blue.100" bgColor="blue.600" size="md">Autor {post?.user?.name} </Tag>
          <Tag color="red.100" bgColor="red.600" size="sm" ml={2}>Curtidas {post?.likes} </Tag>
          <Tag color="green.100" bgColor="green.600" size="sm" ml={2}>Comentários {post?.comments?.length} </Tag>
          <Box maxW="960px" mt={3} p={2}>
            <Form onSubmit={handleSubmit} ref={formRef}>
              <Stack spacing={8}>
              <FormControl>
                <Select 
                  isMulti
                  options={categories.map(c=>({value: c.id, label: c.description}))} 
                  name="category_ids" 
                />
              </FormControl>
              <FormControl hidden>
                <Input 
                  placeholder="id" 
                  name="id" 
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
                <FormLabel>Descrição</FormLabel>
                <Input 
                  as="textarea" 
                  minH="300px" 
                  p={3} 
                  placeholder="Descrição" 
                  name="body" 
                />
              </FormControl>
              <FormControl>
                <Button variant="outline" type="submit" colorScheme="green" isLoading={isLoading}>
                  Atualizar
                </Button>
              </FormControl>
              </Stack>
            </Form>
          </Box>
        </Box>)
          : (
          <Flex align="center" justify="center">
            <Loading type={"spin"} color={"white"} height={200} width={200}/>
          </Flex>
        )}
      </Container>  
    </MainLayout>
    ) : (
      <Redirect to="/"/>
    )

  );
}

export default PostEdit;