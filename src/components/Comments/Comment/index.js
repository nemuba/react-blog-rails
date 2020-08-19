import React from 'react';
import { Tag, Text, Box } from '@chakra-ui/core';

const Comment = ({comment}) => {
  return(
    <Box maxW="960px" mt={3} p={3} bgColor="blue" border="1px solid #aaa" borderRadius="5px" >
      <Tag color="blue" fontWeight="bold">{comment.user?.username} | {comment.user?.email}</Tag>
      <Text m={3} p={3}>{comment.description}</Text>
      <Box as="span" ml={3} flex="1 1 960px" color="gray.600">Criado em {comment.created_at}</Box>
    </Box>
  );
}

export default Comment;