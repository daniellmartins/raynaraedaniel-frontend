import React from "react";
import styled from "styled-components";

import { theme } from "../config";
import { MenuItem } from "./";
import { Heart } from "./icons";

export const Menu = () => (
  <StyledMenu>
    <MenuList>
      <MenuItem scroll={false} href="/" label="Home" />
      <li>
        <Heart fill={theme.color.primary} width={16} height={12} />
      </li>
      <MenuItem
        scroll={false}
        href="/"
        as="/nossa-historia"
        label="Nossa História"
      />
      <li>
        <Heart fill={theme.color.primary} width={16} height={12} />
      </li>
      <MenuItem
        scroll={false}
        href="/"
        as="/nossa-galeria"
        label="Nossa Galeria"
      />
      <li>
        <Heart fill={theme.color.primary} width={16} height={12} />
      </li>
      <MenuItem
        scroll={false}
        href="/"
        as="/padrinhos-e-madrinhas"
        label="Padrinhos e Madrinhas"
      />
      <li>
        <Heart fill={theme.color.primary} width={16} height={12} />
      </li>
      <MenuItem
        prefetch
        href="/products"
        as="/lista-de-presentes"
        label="Lista de Presentes"
      />
    </MenuList>
  </StyledMenu>
);

const StyledMenu = styled.div``;

const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    display: inline-block;
  }
`;
