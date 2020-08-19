import React, { useEffect, useState, useContext } from 'react';
import { Heading, Container, Box, Text, Tag, Flex, IconButton, useToast } from '@chakra-ui/core';
import { FaHome, FaHeart, FaHeartBroken, FaTrash, FaEdit} from 'react-icons/fa';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import Comments from '../../components/Comments';
import Dialog from './../../components/Dialog';
import api from '../../services/api';
import { isAuthenticated } from '../../services/auth';
import AuthContext from './../../contexts/auth';

const Reading = () => {

  const {id} = useParams();
  const [post, setPost] = useState({});
  const toast = useToast();
  const history = useHistory();
  const {user} = useContext(AuthContext);

  const handleDelete = (id) =>{
    api.delete(`/posts/${id}`)
    .then(response => {
      toast({title: "Post", description:"Excluido", status:"success",position: "top-right", duration: 2000, isClosable:true})
      history.push("/");
    })
    .catch(()=> toast({title: "Post", description:"Não foi possivel excluir!", status:"error",isClosable: true, duration: 2000}))
  }

  useEffect(()=>{
    const loadPost = () =>{
      api.get(`/posts/${id}`)
      .then(response=> setPost(response.data))
      .catch(() => {
        toast({title: "Dados não encontrados !", status:"error",isClosable: true, duration: 2000});
        history.push("/");
      });
    };
    loadPost(); 
  },[id, history, toast]);

  const handleLike = () =>{
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
      })
      .catch(error => console.log(error));
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
      })
      .catch(error => console.log(error));
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
        <Box mt={8} px={8} pt={8} pb={2} maxW="960px" border="1px solid #ddd" shadow="md" borderRadius="5px">
          <Heading my={2}>{post?.title}</Heading>
          <Tag size="md" color="blue.100" bgColor="blue.600">Criado por {post?.user?.name}</Tag>
          
          <Box maxW="960px" mt={3}>
            <Text>{post?.body}</Text>
          </Box>
          <Flex maxW="960px" mt={3} p={2}>
            <Box as="span" flex="1 1 20px" display="flex">
              { isAuthenticated() ?(
                <>
                  <IconButton 
                    icon={post?.liked ? <FaHeart fill="red"/> : <FaHeartBroken fill="yellow"/>} 
                    onClick={handleLike}
                  />
                  <Text m={3}>{post?.liked ? "Curtiu" : ""}</Text>
                </>
              ):(<Link to="/signin"><Text color="blue.600">Faça login pra dar like</Text></Link>)}
            </Box>
            <Box as="span" mt={4} display="flex">
              <Text mt={2}>Comentários {post?.comments?.length} | Curtidas {post?.likes}</Text>
              {isAuthenticated() && user?.id === post?.user?.id ? (
              <>
                <Dialog handleDelete={handleDelete} id={id} title="Excluir Post"/>
                <Link to={`/post/${id}/edit`}>
                  <IconButton 
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
        <Comments comments={post?.comments} post={post} setPost={setPost}/>
      </Container>  
    </MainLayout>
  );
}

export default Reading;