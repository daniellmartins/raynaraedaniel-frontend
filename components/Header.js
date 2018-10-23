import React from "react";
import Link from "next/link";
import styled from "styled-components";

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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1090;

  background-color: #bebebe;
`;

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const StyledLogo = styled.h1`
  color: #ffffff;
  font-size: 1em;
  font-weight: 600;

  margin: 0;

  a {
    color: #ffffff;
    text-decoration: none;
  }
`;
