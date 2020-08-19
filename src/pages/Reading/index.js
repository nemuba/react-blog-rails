import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { Heading, Container, Box, Text, Tag, Flex, IconButton, useToast } from '@chakra-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { FaHome, FaHeart, FaHeartBroken} from 'react-icons/fa';
import Comments from '../../components/Comments';
import { isAuthenticated } from '../../services/auth';

const Reading = () => {

  const {id} = useParams();
  const [post, setPost] = useState({});
  const toast = useToast();
  const history = useHistory();

  useEffect(()=>{
    const loadPost = () =>{
      api.get(`/posts/${id}`)
      .then(response=> setPost(response.data))
      .catch(error => {
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
          </Link>
        </Box>
        <Box mt={8} px={8} pt={8} pb={2} maxW="960px" border="1px solid #aaa" shadow="md" borderRadius="5px">
          <Heading my={2}>{post?.title}</Heading>
          <Tag color="blue.300">Autor {post?.user?.username} - {post?.user?.name}</Tag>
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
                  <Text m={3}>{post?.liked ? "you liked" : ""}</Text>
                </>
              ):(<Link to="/signin"><Text color="blue.600">Faça login para comentar</Text></Link>)}
            </Box>
            <Box as="span" mt={4}>Comentários {post?.comments?.length} | Likes {post?.likes}</Box>
          </Flex>
        </Box>
        <Comments comments={post?.comments} post={post} setPost={setPost}/>
      </Container>  
    </MainLayout>
  );
}

export default Reading;