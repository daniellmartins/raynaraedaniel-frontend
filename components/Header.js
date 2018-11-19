import React from "react";
import Link from "next/link";
import styled, { css, keyframes } from "styled-components";

import { Container, Menu } from "../components";

export const Header = () => (
  <StyledHeader>
    <StyledContainer>
      <StyledLogo>
        <Link href="/">
          <a>Raynara e Daniel</a>
        </Link>
      </StyledLogo>
      <Menu />
    </StyledContainer>
  </StyledHeader>
);

const StyledHeader = styled.header`
  position: relative;
  top: 0;
  z-index: 1090;

  width: 100%;

  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  background-color: transparent;

  ${({ theme }) =>
    theme.headerFixed &&
    css`
      position: fixed;
      background-color: rgba(255, 255, 255, 0.95);
      animation-name: ${show};
      animation-duration: 1s;
      animation-fill-mode: both;
    `}
`;

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const StyledLogo = styled.h1`
  color: #ffffff;
  font-family: "Tangerine", sans-serif;
  font-size: 2em;
  font-weight: 600;

  margin: 0;

  a {
    color: #ffffff;
    text-decoration: none;

    ${({ theme }) =>
      theme.headerFixed &&
      css`
        color: ${theme.color.text};
      `}
  }
`;

const show = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0,-100%,0);
  }

  100% {
    opacity: 1;
    transform: none;
  }
`;
