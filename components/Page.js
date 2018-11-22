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
    const { children, loading } = this.props;
    const { headerFixed } = this.state;
    return (
      <ThemeProvider theme={{ ...theme, headerFixed }}>
        <StyledPage>
          <Meta />
          <Loading loading={loading} />
          <Header />
          {children}
          <GlobalStyles />
        </StyledPage>
      </ThemeProvider>
    );
  }
}

const Loading = ({ loading }) => (
  <StyledLoading loading={loading}>
    {loading && (
      <div className="loading">
        <div className="loading-1" />
        <div className="loading-2" />
        <div className="loading-3" />
        <div className="loading-4" />
      </div>
    )}
  </StyledLoading>
);

const StyledLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2010;

  pointer-events: none;
  transform-origin: 50% 0%;
  transform: ${({ loading }) => (loading ? "scaleY(1)" : "scaleY(0)")};
  transition: transform 0.2s ease;

  .loading {
    position: relative;
    height: 2px;

    div {
      background: #fff;
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      transform-origin: 0% 0%;
      transform: scaleX(0);
    }
  }

  .loading-1 {
    background-color: red;
    animation: progress-indeterminate-1 2.5s linear infinite;
    z-index: 1;
  }

  .loading-2 {
    animation: progress-indeterminate-2 2.5s ease-in infinite;
    z-index: 2;
  }
  .loading-3 {
    background-color: red;
    animation: progress-indeterminate-3 2.5s ease-out infinite;
    z-index: 3;
  }
  .loading-4 {
    animation: progress-indeterminate-4 2.5s ease-out infinite;
    z-index: 4;
  }
`;

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

  @keyframes progress-indeterminate-1 {
    0% {
      transform: scaleX(0);
    }
    50%, 100% {
      transform: scaleX(1);
    }
  }

  @keyframes progress-indeterminate-2 {
    0%, 20% {
      transform: scaleX(0);
    }
    70%, 100% {
      transform: scaleX(1);
    }
  }

  @keyframes progress-indeterminate-3 {
    0%, 60% {
      transform: scaleX(0);
    }
    90%, 100% {
      transform: scaleX(1);
    }
  }

  @keyframes progress-indeterminate-3 {
    0%, 75% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }
`;
