import React from "react";
import styled from "styled-components";

import { MenuItem } from "./";

export const Menu = () => (
  <StyledMenu>
    <MenuList>
      <MenuItem href="/" label="Home" />
      <MenuItem href="/" label="Nossa História" />
      <MenuItem href="/" label="Nossa Galeria" />
      <MenuItem href="/" label="Padrinhos e Madrinhas" />
    </MenuList>
  </StyledMenu>
);

const StyledMenu = styled.div``;

const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
