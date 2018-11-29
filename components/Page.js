import React, { Component } from "react";
import Router from "next/router";
import styled, {
  ThemeProvider,
  css,
  createGlobalStyle
} from "styled-components";

import { theme } from "../config";
import { Meta, Header } from "./";

export class Page extends Component {
  state = { loading: true, headerFixed: false, headerShow: false };

  componentDidMount() {
    this.handleScroll();
    this.handleScrollTo();
    window.addEventListener("scroll", this.handleScroll);

    Router.events.on("routeChangeStart", () => {
      this.setState({ loading: true });
    });
    Router.events.on("routeChangeComplete", this.handleScrollTo);
    Router.events.on("routeChangeError", this.handleScrollTo);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    Router.events.off("routeChangeStart", this.handleScrollTo);
    Router.events.off("routeChangeComplete", this.handleScrollTo);
    Router.events.off("routeChangeError", this.handleScrollTo);
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

  handleScrollTo = () => {
    const { asPath } = this.props;
    let id;

    this.setState({ loading: false });

    switch (asPath) {
      case "/padrinhos-e-madrinhas":
        id = "#friends";
        break;
      case "/nossa-galeria":
        id = "#gallery";
        break;
      case "/nossa-historia":
        id = "#history";
        break;
      default:
        id = "body";
        break;
    }

    if (id === "body") {
      return window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const top = document.querySelector(id).offsetTop - 60;
      return window.scrollTo({ top, behavior: "smooth" });
    }
  };

  render() {
    const { children } = this.props;
    const { loading, headerFixed } = this.state;
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
      background: ${({ theme }) => theme.color.primary};
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
    background-color: ${({ theme }) => theme.color.primary};
    animation: progress-indeterminate-1 2.5s linear infinite;
    z-index: 1;
  }

  .loading-2 {
    animation: progress-indeterminate-2 2.5s ease-in infinite;
    z-index: 2;
  }
  .loading-3 {
    background-color: ${({ theme }) => theme.color.primary};
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

  ${({ theme }) =>
    theme.headerFixed &&
    css`
      padding-top: ${({ theme }) => theme.metric.header.height.sm};

      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        padding-top: ${({ theme }) => theme.metric.header.height.md};
      }
    `};
`;

const GlobalStyles = createGlobalStyle`
  button,hr,input{overflow:visible}progress,sub,sup{vertical-align:baseline}[type=checkbox],[type=radio],legend{box-sizing:border-box;padding:0}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:ButtonText dotted 1px}fieldset{padding:.35em .75em .625em}legend{color:inherit;display:table;max-width:100%;white-space:normal}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}[hidden],template{display:none}

  /* cyrillic */
  @font-face {
    font-family: 'Playfair Display';
    font-style: italic;
    font-weight: 400;
    font-display: fallback;
    src: local('Playfair Display Italic'), local('PlayfairDisplay-Italic'), url(https://fonts.gstatic.com/s/playfairdisplay/v13/nuFkD-vYSZviVYUb_rj3ij__anPXDTnohkk72xU.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: 'Playfair Display';
    font-style: italic;
    font-weight: 400;
    font-display: fallback;
    src: local('Playfair Display Italic'), local('PlayfairDisplay-Italic'), url(https://fonts.gstatic.com/s/playfairdisplay/v13/nuFkD-vYSZviVYUb_rj3ij__anPXDTnojUk72xU.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Playfair Display';
    font-style: italic;
    font-weight: 400;
    font-display: fallback;
    src: local('Playfair Display Italic'), local('PlayfairDisplay-Italic'), url(https://fonts.gstatic.com/s/playfairdisplay/v13/nuFkD-vYSZviVYUb_rj3ij__anPXDTnojEk72xU.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Playfair Display';
    font-style: italic;
    font-weight: 400;
    font-display: fallback;
    src: local('Playfair Display Italic'), local('PlayfairDisplay-Italic'), url(https://fonts.gstatic.com/s/playfairdisplay/v13/nuFkD-vYSZviVYUb_rj3ij__anPXDTnogkk7.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-display: fallback;
    src: local('Poppins SemiBold'), local('Poppins-SemiBold'), url(https://fonts.gstatic.com/s/poppins/v5/pxiByp8kv8JHgFVrLEj6Z11lFc-K.woff2) format('woff2');
    unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-display: fallback;
    src: local('Poppins SemiBold'), local('Poppins-SemiBold'), url(https://fonts.gstatic.com/s/poppins/v5/pxiByp8kv8JHgFVrLEj6Z1JlFc-K.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-display: fallback;
    src: local('Poppins SemiBold'), local('Poppins-SemiBold'), url(https://fonts.gstatic.com/s/poppins/v5/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-display: fallback;
    src: local('Poppins Bold'), local('Poppins-Bold'), url(https://fonts.gstatic.com/s/poppins/v5/pxiByp8kv8JHgFVrLCz7Z11lFc-K.woff2) format('woff2');
    unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-display: fallback;
    src: local('Poppins Bold'), local('Poppins-Bold'), url(https://fonts.gstatic.com/s/poppins/v5/pxiByp8kv8JHgFVrLCz7Z1JlFc-K.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-display: fallback;
    src: local('Poppins Bold'), local('Poppins-Bold'), url(https://fonts.gstatic.com/s/poppins/v5/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* latin */
  @font-face {
    font-family: 'Tangerine';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: local('Tangerine Regular'), local('Tangerine-Regular'), url(https://fonts.gstatic.com/s/tangerine/v9/IurY6Y5j_oScZZow4VOxCZZM.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

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

  @keyframes header {
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }

    80% {
      opacity: 1;
    }

    100% {
      transform: translateY(0);
    }
  }

  @keyframes banner {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-50vh);
    }
  }

  @keyframes signin {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100vh);
    }
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
