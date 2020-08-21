import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/core';
import PostItem from './PostItem';
import api from './../../services/api';
import {toast} from '@chakra-ui/core';
import Loading from 'react-loading';

const Posts = () => {

  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const loadPosts = ()=>{
      api.get('/posts')
      .then(resp => setPosts(resp.data.posts))
      .catch(e=> toast.notify("Erro"));
    }
    loadPosts();
  },[]);

  return posts?.length ? (
    <Flex align="center" wrap="wrap" maxW="960px" p={3}>
      {posts?.map(post => (<PostItem key={post.id} post={post}/>))}
    </Flex>
  ) : (
    <Flex align="center" justify="center">
      <Loading type={"spin"} color={"white"} height={667} width={375}/>
    </Flex>
  );
}

export default Posts;