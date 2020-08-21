import React from 'react';

const CategoryItem = ({category}) => {
  return(
  <option value={category.id} >{category.description}</option>
  );
}

export default CategoryItem;