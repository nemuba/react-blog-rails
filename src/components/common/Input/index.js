import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import {Input as InputForm, FormHelperText} from '@chakra-ui/core';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error, clearError } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return(
    <>
    <InputForm onFocus={clearError} ref={inputRef} defaultValue={defaultValue} {...rest} />
    {error && <FormHelperText color="red.600">{error}</FormHelperText>}
    </>
  );
}