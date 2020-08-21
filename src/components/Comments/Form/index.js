import React, { useState } from 'react';
import { useToast, Stack, FormControl, Input, Button, FormLabel } from '@chakra-ui/core';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';

// import { Container } from './styles';

const Form = ({setPost}) => {

  const {id} = useParams();
  const [comment, setComment] = useState({description: ""});
  const [isLoad, setIsLoad] = useState(false);
  const toast = useToast();

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setComment({...comment, [name]:value});
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    setIsLoad(true);
    api.post(`/posts/${id}/comments`, {comment})
    .then(response =>{
       if(response.status === 201){
        setPost(response.data);
        setComment({description: ""});
        setIsLoad(false);
        toast({
          title:"Comentário",
          description: "Criado com sucesso!",
          position:"top-right",
          duration: 9000,
          isClosable:true,
          status: "success"
        });
       }else if(response.status === 200){
        toast({
          title:"Comentário",
          description: response.data.join(", "),
          position:"top-right",
          duration: 9000,
          isClosable:true,
          status: "error"
        });
        setIsLoad(false);
       }
    })
    .catch(error => console.log(error));
  }

  return(
    <Stack spacing={4}>
      <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Descrição</FormLabel>
        <Input
          p={3}
          rows={10}
          height="100px"   
          as="textarea" 
          placeholder="Descrição" 
          onChange={handleChange}
          name="description" value={comment?.description}/>
      </FormControl>
      <FormControl>
        <Button 
          isLoading={isLoad}
          mt={2}
          variant="outline" 
          type="submit" 
          colorScheme="blue">
            Criar
        </Button>
      </FormControl>
      </form>
    </Stack>
  );
}

export default Form;