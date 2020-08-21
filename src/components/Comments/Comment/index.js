import React, { useContext } from 'react';
import { Tag, Text, Box, useToast } from '@chakra-ui/core';
import Dialog from './../../Dialog';
import api from './../../../services/api';
import AuthContext from './../../../contexts/auth';

const Comment = ({comment, post_id, setPost}) => {
  const {user} = useContext(AuthContext);
  const toast = useToast();

  const handleDeleteComment = (id) =>{
    api.delete(`/posts/${id}/comments/${comment.id}`)
    .then(response=> {
      if(response.status === 200){
      toast({
        title:"Comentário",
        description: "Excluido com sucesso!",
        status: "success",
        position: "top-right",
        isClosable: true
      });
      setPost(response.data);
    }
    })
    .catch(error => {
      toast({
        title:"Comentário",
        description: "Não foi posivel excluir",
        status: "error",
        position: "top-right",
        isClosable: true
      });
    });
  }

  return(
    <Box maxW="960px" mt={3} p={3} bgColor="blue" border="1px solid #ddd" borderRadius="5px" >
      <Tag size="sm" color="blue.100" bgColor="blue.600" fontWeight="bold"> Escrito por {comment.user?.email}</Tag>
      <Text m={3} p={3}>{comment.description}</Text>
      <Box
        fontSize="12px" 
        as="span" 
        ml={3} 
        flex="1 1 960px" 
        color="gray.600"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Text color="grey.600" mt={3}>Criado em {comment.created_at}</Text>
        {comment?.user?.id === user?.id ? (
          <Dialog handleDelete={handleDeleteComment} id={post_id} title={"Excluir comentário"} size="sm"/>
        ) : null}
      </Box>
    </Box>
  );
}

export default Comment;