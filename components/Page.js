import React, { Component } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import { theme } from "../config";
import { Meta, Header } from "./";

export class Page extends Component {
  state = { headerFixed: false, headerShow: false };

  componentDidMount() {
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const scrollY = window.scrollY;
    const { headerFixed } = this.state;
    if (scrollY >= 80 && !headerFixed) {
      this.setState({ headerFixed: true });
    }

    if (scrollY < 80 && headerFixed) {
      this.setState({ headerFixed: false });
    }
  };

  render() {
    const { children } = this.props;
    const { headerFixed } = this.state;
    return (
      <ThemeProvider theme={{ ...theme, headerFixed }}>
        <StyledPage>
          <Meta />
          <Header />
          {children}
          <GlobalStyles />
        </StyledPage>
      </ThemeProvider>
    );
  }
}

const StyledPage = styled.main`
  position: relative;
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

  button {
    cursor: pointer;
    outline: none;
  }

  button,
  a {
    transition: all 0.25s linear;
  }
`;
