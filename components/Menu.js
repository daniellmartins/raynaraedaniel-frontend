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
        <Heart fill={theme.color.primary} width={14} height={10} />
      </li>
      <MenuItem
        scroll={false}
        href="/"
        as="/nossa-historia"
        label="Nossa História"
      />
      <li>
        <Heart fill={theme.color.primary} width={14} height={10} />
      </li>
      <MenuItem
        scroll={false}
        href="/"
        as="/nossa-galeria"
        label="Nossa Galeria"
      />
      <li>
        <Heart fill={theme.color.primary} width={14} height={10} />
      </li>
      <MenuItem
        scroll={false}
        href="/"
        as="/padrinhos-e-madrinhas"
        label="Padrinhos e Madrinhas"
      />
      <li>
        <Heart fill={theme.color.primary} width={14} height={10} />
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

const StyledMenu = styled.div`
  /* position: relative; */
`;

const MenuList = styled.ul`
  position: absolute;
  top: ${({ theme }) => theme.metric.header.height.sm};
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  list-style: none;
  margin: 0;
  padding: 0;

  background-color: #ffffff;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }

  li {
    display: inline-block;
  }
`;
