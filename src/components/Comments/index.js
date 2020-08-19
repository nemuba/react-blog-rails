import React from 'react';
import Comment from './Comment';
import Form from './Form';
import { Box, Heading, Text } from '@chakra-ui/core';
import { isAuthenticated } from './../../services/auth';
import { Link } from 'react-router-dom';

const Comments = ({comments, post, setPost}) => {
  return(
    <Box maxW="960px" mt={3} p={8} border="1px solid #aaa" borderRadius="5px">
      <Heading mb={3} fontSize="1.5em">Criar comentário</Heading>
      { isAuthenticated() ? 
        (<Form post={post} setPost={setPost}/>) : 
        (<Link to="/signin"><Text color="blue.600">Faça login para comentar</Text></Link>)
      }
      
      <Heading fontSize="1.0em" mt={3}>Comentários {comments?.length}</Heading>
      {comments?.map(comment => (<Comment key={comment.id} comment={comment} />))}
    </Box>
  );
}

export default Comments;