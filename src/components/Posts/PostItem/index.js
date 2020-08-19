import React, { useContext } from 'react';
import { Box, Heading, Text, Tag } from '@chakra-ui/core';
import {Link} from 'react-router-dom';
import {FaHeart, FaComment, FaEdit, FaTrash} from 'react-icons/fa';
import AuthContext from './../../../contexts/auth';

const PostItem = ({post}) => {

  const {user} = useContext(AuthContext);
  
  return(
    <Box p={[5,5,2,5]} flex="1 1 960px" mb={3} shadow="md" borderWidth="1px" width="960px" borderRadius="5px">
      <Heading fontSize="xl">
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </Heading>
      <Text mt={4}>{post.body}</Text>
      <Link to={`/post/${post.id}`} style={{textDecoration: "underline"}}> see plus ...</Link>
      <Box mt={3} display="flex"  justifyContent="space-between">
        <Box as="span" color="gray.600" mr={3}>
          <Tag>Autor {post.user.name}</Tag>
        </Box>    
        <Box color="gray.600" display="flex">
           <Box mr={3} >
            <Text>{post.liked ? "you liked" : ""}</Text>
           </Box>
           <Box mt={1} >
            <FaHeart size={16} fill="red"/>
           </Box>
           <Box ml={2}>
            <Box as="span">{post.likes}</Box>
           </Box>
            <Box ml={2} mt={1}>
              <FaComment size={16} fill="grey"/>
            </Box>
            <Box ml={2}>
              <Box as="span">{post.comments.length}</Box>
            </Box>
            {post.user?.id === user?.id ? (
              <>
              <Box ml={2} mt={1}>
                <Link to={`/post/${post.id}/edit`}>
                  <FaEdit size={16} />
                </Link>
              </Box>
              <Box ml={2} mt={1}>
                <FaTrash size={16} />
              </Box>
              </>
            ) : null}
        </Box>
      </Box>
    </Box>
  );
}

export default PostItem;