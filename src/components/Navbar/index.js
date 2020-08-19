import React from 'react';
import { Menu, MenuButton, Box, MenuItem, MenuList, MenuDivider, MenuGroup } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { isAuthenticated } from './../../services/auth';
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
        Blog
      </MenuButton>
      <MenuList>
        <MenuGroup title={ isAuthenticated() ? "Profile" : "Blog"}>
        { isAuthenticated() ? (
           <>
           <MenuItem>
             <Link to="/profile">Account</Link>
           </MenuItem>
           <MenuItem>
             <Link to="/logout">Logout</Link>
           </MenuItem>
           </>
        ) : (
           <MenuItem>
             <Link to="/signin">Login</Link>
           </MenuItem>
        ) }
       
         </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Pages">
        { isAuthenticated() ? (
          <MenuItem>
            <Link to="/post/new">New Post</Link>
          </MenuItem>
        ) : null }
          <MenuItem>
            <Link to="/">Posts</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/about">About</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/contact">Contact</Link>
          </MenuItem>
        </MenuGroup>
      </MenuList>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Menu>
    </Box>
  );
}

export default Navbar;