import React from 'react';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

const MarkDown = ({markdown = '# Alef'}) =>{
  return(
    <ReactMarkdown
      renderers={ChakraUIRenderer()}
      source={markdown}
    />
  );
}

export default MarkDown;