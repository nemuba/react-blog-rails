import React from 'react';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from "chakra-ui-markdown-renderer";


const MarkDown = ({markdown}) =>{
  return(
    <ReactMarkdown
      renderers={ChakraUIRenderer()}
      source={markdown}
      escapeHtml={false}
    />
  );
}

export default MarkDown;