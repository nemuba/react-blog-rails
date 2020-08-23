import React, { useState, useRef } from 'react';
import { useToast, Stack, FormControl, Button, FormLabel } from '@chakra-ui/core';
import { useParams } from 'react-router-dom';
import {Form} from '@unform/web';
import Input from './../../common/Input';
import api from '../../../services/api';

// import { Container } from './styles';

const FormComment = ({setPost}) => {

  const {id} = useParams();
  const [isLoad, setIsLoad] = useState(false);
  const toast = useToast();
  const formRef = useRef(null);

  const handleSubmit = async (data, {reset}) =>{
    const {description} = data;

    setIsLoad(true);
    if(!description){
      formRef.current.setFieldError('description','Descrição requerida');
      setIsLoad(false);
    }else{
      await api.post(`/posts/${id}/comments`, {comment: {...data}})
      .then(response =>{
        if(response.status === 201){
          setPost(response.data);
          setIsLoad(false);
          toast({
            title:"Comentário",
            description: "Criado com sucesso!",
            position:"top-right",
            duration: 9000,
            isClosable:true,
            status: "success"
          });
          reset();
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
  }

  return(
    <Stack spacing={4}>
      <Form onSubmit={handleSubmit} ref={formRef}>
      <FormControl>
        <FormLabel>Descrição</FormLabel>
        <Input
          p={3}
          rows={10}
          height="100px"   
          as="textarea" 
          placeholder="Descrição" 
          name="description"/>
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
      </Form>
    </Stack>
  );
}

export default FormComment;