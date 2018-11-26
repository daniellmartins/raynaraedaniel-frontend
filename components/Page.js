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
  button,hr,input{overflow:visible}progress,sub,sup{vertical-align:baseline}[type=checkbox],[type=radio],legend{box-sizing:border-box;padding:0}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:ButtonText dotted 1px}fieldset{padding:.35em .75em .625em}legend{color:inherit;display:table;max-width:100%;white-space:normal}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}[hidden],template{display:none}

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
