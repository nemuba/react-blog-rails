import React, { useState, useEffect } from 'react';
import CategoryItem from './CategoryItem';
import { FormControl, Select, FormLabel } from '@chakra-ui/core';

const Categories = ({categories, setCategory, defaultValue}) => {

  const [selected, setSelected] = useState(defaultValue); 

  const handleChange = (e) =>{
    setCategory(e.target.value);
  }

  useEffect(()=>{
    setSelected(defaultValue);
  },[defaultValue])

  return(
    <FormControl colorScheme="green">
      <FormLabel>Categoria</FormLabel>
      <Select placeholder="Selecione" name="category_ids" onChange={(e)=> handleChange(e)} defaultValue={selected}>
      {categories.map(category=> (<CategoryItem key={category.id} category={category}/>))}
      </Select>
    </FormControl>
  );
}

export default Categories;