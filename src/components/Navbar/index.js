import React from 'react';
import { Menu, MenuButton, Box, MenuItem, MenuList, MenuDivider, MenuGroup, IconButton } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { isAuthenticated } from './../../services/auth';
import { FaBlog } from 'react-icons/fa';
const Navbar = () => {
  return(
    <Box 
      display="flex"
      p={3}
      justifyContent="space-around"  
      width="100vw"
      shadow="md"
      borderBottom="1px solid #ddd">
    <Menu>
      <MenuButton fontWeight="bold" fontSize="xl">
        <IconButton icon={<FaBlog />} mr={3}/> React Blog
      </MenuButton>
      <MenuList>
        <MenuGroup title={ isAuthenticated() ? "Perfil" : "Blog"}>
        { isAuthenticated() ? (
           <>
           <MenuItem>
             <Link to="/profile">Minha Conta</Link>
           </MenuItem>
           <MenuItem>
             <Link to="/logout">Sair</Link>
           </MenuItem>
           </>
        ) : (
           <MenuItem>
             <Link to="/signin">Entrar</Link>
           </MenuItem>
        ) }
       
         </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Páginas">
        { isAuthenticated() ? (
          <MenuItem>
            <Link to="/post/new">Novo Post</Link>
          </MenuItem>
        ) : null }
          <MenuItem>
            <Link to="/">Posts</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/about">Sobre</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/contact">Contato</Link>
          </MenuItem>
        </MenuGroup>
      </MenuList>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Menu>
    </Box>
  );
}

export default Navbar;