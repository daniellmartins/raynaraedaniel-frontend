import React from "react";
import Link from "next/link";
import styled, { css } from "styled-components";

import { site } from "../config";
import { Container, Menu } from "../components";

export const Header = () => (
  <StyledHeader>
    <StyledContainer>
      <StyledLogo>
        <Link href="/" scroll={false}>
          <a>{site.name}</a>
        </Link>
      </StyledLogo>
      <Menu />
    </StyledContainer>
  </StyledHeader>
);

const StyledHeader = styled.header`
  color: ${({ theme }) => theme.color.text};

  position: relative;
  top: 0;
  z-index: 1090;

  width: 100%;

  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  background-color: #ffffff;

  ${({ theme }) =>
    theme.headerFixed &&
    css`
      position: fixed;
      animation-name: header;
      animation-duration: 1s;
      animation-fill-mode: both;
      background-color: rgba(255, 255, 255, 0.98);
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    `}
    
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    color: #ffffff;
    background-color: transparent;

    ${({ theme }) =>
      theme.headerFixed &&
      css`
        background-color: rgba(255, 255, 255, 0.98);
      `}
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ theme }) => theme.metric.header.height.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: ${({ theme }) => theme.metric.header.height.md};
  }
`;

const StyledLogo = styled.h1`
  color: inherit;
  font-family: "Tangerine", sans-serif;
  font-size: 2em;
  font-weight: 600;

  margin: 0;

  a {
    color: inherit;
    text-decoration: none;

    ${({ theme }) =>
      theme.headerFixed &&
      css`
        color: ${theme.color.text};
      `}
  }
`;
