import React, { useRef, useEffect } from 'react';
import ReactSelect from 'react-select';
import { useField } from '@unform/core';
import { FormHelperText } from '@chakra-ui/core';


const Select = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',
      setValue: (ref, value) => {
        ref.select.setValue(value);
      },
      clearValue: ref => {
        ref.select.clearValue();
      },
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option) => option.value);
        } else {
          if (!ref.state.value) {
            return '';
          }
          return ref.state.value.value;
        }
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <>
    <ReactSelect
      defaultValue={defaultValue}
      ref={selectRef}
      label="Selecione"
      styles={{
        control: styles => ({...styles, backgroundColor: 'grey.600'}),
        option: styles => ({...styles, color: 'black'}),
        multiValue : styles => ({...styles, backgroundColor: 'blue', color:'white'}),
        multiValueLabel : styles => ({...styles, color: 'white'}),
      }}
      {...rest}
    />
      {error && <FormHelperText color="red.600">{error}</FormHelperText>}
    </>
  );
};

export default Select;