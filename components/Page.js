import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import { theme } from "../config";
import { Meta, Header } from "./";

export const Page = ({ children }) => (
  <ThemeProvider theme={theme}>
    <StyledPage>
      <Meta />
      <Header />
      {children}
      <GlobalStyles />
    </StyledPage>
  </ThemeProvider>
);

const StyledPage = styled.main`
  margin: 0;
`;

const GlobalStyles = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
  }

  body {
    color: ${({ theme }) => theme.color.text};
    font-family: "Poppins", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;

    background-color: #f7f7f7;
  }
`;
