import React, { useState, useContext, useEffect } from 'react';
import { Heading, Container, Box, Text, Tag, Flex, IconButton, useToast } from '@chakra-ui/core';
import { FaHome, FaHeart, FaEdit} from 'react-icons/fa';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import Comments from '../../components/Comments';
import Dialog from './../../components/Dialog';
import api from '../../services/api';
import { isAuthenticated } from '../../services/auth';
import AuthContext from './../../contexts/auth';
import Loading from 'react-loading';

const Reading = () => {

  const {id} = useParams();
  const [post, setPost] = useState({});
  const toast = useToast();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useContext(AuthContext);

  const handleDelete = (id) =>{
    api.delete(`/posts/${id}`)
    .then(response => {
      if(response.status === 204){
        toast({
          title: "Post", 
          description:"Excluido", 
          status:"success",
          position: "top-right",
          duration: 2000, 
          isClosable:true
        });
        history.push("/");
      }
    })
    .catch(()=> {
      toast({
        title: "Post", 
        description:"Não foi possivel excluir!", 
        status:"error",
        isClosable: true, 
        duration: 2000
      });
    });
  }
  
  useEffect(()=>{
    const loadPost = () =>{
      api.get(`/posts/${id}`)
      .then(response=> {
        if(response.status === 200){
         setPost(response.data);
        }
      })
      .catch(() => {
        toast({
          title: "Dados não encontrados !", 
          status:"error",
          isClosable: true, 
          duration: 2000
        });
        history.push("/");
      });
    };
    loadPost(); 
  },[id, history, toast]);

  const handleLike = () =>{
    setIsLoading(true);
    if(post.liked){
      api.delete(`/posts/${id}/dislike`)
      .then(response => {
        setPost(response.data);
        toast({
          title: "Dislike",
          description: ":(",
          status: "warning",
          position: "top-right",
          duration:9000,
          isClosable: true
        });
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
    }else{
      api.post(`/posts/${id}/like`)
      .then(response => {
        setPost(response.data);
        toast({
          title: "Like",
          description: ":)",
          status: "success",
          position: "top-right",
          duration:9000,
          isClosable: true
        });
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
    }
  }
  
  return(
    <MainLayout>
      <Container maxW="lg">
        <Box mt={2} pl={2} maxW="960px">
          <Link to="/">
            <IconButton icon={<FaHome />} />
          </Link> / Lendo          
        </Box>
        {post?.title != null ? (
        <Box mt={8} px={8} pt={8} pb={2} maxW="960px" border="1px solid #ddd" shadow="md" borderRadius="5px">
          <Heading my={2}>{post?.title}</Heading>
          <Tag size="sm" m={1} bgColor="purple.600">{post?.categories?.map(c => c.description).join(", ")}</Tag>
          <Tag size="sm" m={1} color="blue.100" bgColor="blue.600">Criado por {post?.user?.name}</Tag>
          
          <Box maxW="960px" mt={3}>
            <Text>{post?.body}</Text>
          </Box>
          <Flex maxW="960px" mt={3} p={2} flexWrap="wrap">
            <Box as="span" mt={3} flex="1 1 200px" display="flex">
              { isAuthenticated() ?(
                <>
                  <IconButton
                    isLoading={isLoading}
                    size="sm" 
                    icon={post?.liked ? <FaHeart fill="red"/> : <FaHeart fill="white"/>} 
                    onClick={handleLike}
                  />
                  <Text m={1}>{post?.liked ? "Curtiu" : ""}</Text>
                </>
              ):(<Link to="/signin"><Text color="blue.600">Faça login pra dar like</Text></Link>)}
            </Box>
            <Box as="span" mt={3} display="flex" flexWrap="wrap">
              <Text mt={2}>Comentários {post?.comments?.length} | Curtidas {post?.likes}</Text>
              {isAuthenticated() && user?.id === post?.user?.id ? (
              <>
                <Dialog handleDelete={handleDelete} id={id} title="Excluir Post" size="sm" />
                <Link to={`/post/${id}/edit`}>
                  <IconButton
                    size="sm" 
                    icon={<FaEdit size={12} 
                    fill="green"/>} 
                    variant="outline" 
                    p={0}
                  />
                </Link>
              </>
            ) : null}
            </Box>
          </Flex>
        </Box>
        ) : (
          <Flex align="center" justify="center">
            <Loading type={"spin"} color={"white"} height={200} width={200}/>
          </Flex>
        )}
        <Comments comments={post?.comments} post={post} setPost={setPost}/>
      </Container>  
    </MainLayout>         
  );
}

export default Reading;