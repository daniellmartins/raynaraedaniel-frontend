import React, { useState } from "react";
import styled, { css } from "styled-components";

import { theme } from "../config";
import { MenuItem } from "./";
import { Heart } from "./icons";

export function Menu() {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen(!open);
  };

  return (
    <StyledMenu>
      <StyledButton open={open} onClick={handleMenu}>
        <span />
        <span />
      </StyledButton>
      <MenuList open={open}>
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
}

const StyledMenu = styled.div`
  /* position: relative; */
`;

const StyledButton = styled.button`
  position: relative;

  /* padding: 0.5rem; */
  width: 2.5rem;
  height: 2.5rem;

  border-radius: 50%;
  background-color: transparent;
  border: none;

  &:hover,
  &:active,
  &:focus {
    background-color: #f7f7f7;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;

    margin-top: -0.075rem;
    margin-left: -0.75rem;
    width: 1.5rem;
    height: 0.15rem;

    background-color: ${({ theme }) => theme.color.primary};
    transform-origin: center;
    transition: transform 0.3s ease;

    &:first-child {
      transform: ${({ open }) =>
        open ? "rotate(-45deg) translateY(0)" : "rotate(0) translateY(-3px)"};
    }

    &:last-child {
      transform: ${({ open }) =>
        open ? "rotate(45deg) translateY(0)" : "rotate(0) translateY(3px)"};
    }
  }
`;

const MenuList = styled.ul`
  position: absolute;
  top: ${({ theme }) => theme.metric.header.height.sm};
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  overflow: hidden;

  margin: 0;
  padding: 2rem 0 0;
  width: 100%;

  background-color: #ffffff;

  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  transform: translateY(-0.5rem);

  transition: opacity 0.25s ease, transform 0.25s ease,
    visibility 0s linear 0.25s;

  ${({ open }) =>
    open &&
    css`
      opacity: 1;
      visibility: visible;
      pointer-events: auto;

      transform: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
    `}

  li {
    display: inline-block;

    margin-bottom: 1rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    position: relative;
    display: block;
    top: auto;
    left: auto;

    padding: 0;
    width: auto;

    opacity: 1;
    visibility: visible;
    pointer-events: auto;

    background-color: transparent;

    transform: none;

    li {
      margin: 0;
    }
  }
`;
