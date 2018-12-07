import React, { Component } from "react";
import Link from "next/link";
import styled, { css } from "styled-components";

import { site } from "../config";
import { Container, Menu } from "../components";

export class Header extends Component {
  state = { light: false };

  componentDidMount() {
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY >= 80 && !this.state.light) {
      this.setState({ light: true });
    }
    if (scrollY < 80 && this.state.light === true) {
      this.setState({ light: false });
    }
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <StyledHeaderWrap>
        <StyledHeader light={this.state.light}>
          <StyledContainer>
            <StyledLogo>
              <Link href="/" scroll={false}>
                <a>{site.name}</a>
              </Link>
            </StyledLogo>
            <Menu />
            {this.props.children}
          </StyledContainer>
        </StyledHeader>
      </StyledHeaderWrap>
    );
  }
}

const StyledHeaderWrap = styled.header`
  position: fixed;
  top: 0;
  z-index: 1090;

  width: 100%;
`;

const StyledHeader = styled.div`
  color: ${({ theme }) => theme.color.text};

  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  background-color: #ffffff;

  a {
    color: ${({ theme }) => theme.color.text};
    text-decoration: none;
    &:hover {
      color: ${({ theme }) => theme.color.primary};
    }
  }

  ${({ light }) =>
    light &&
    css`
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    `}

  transition: background-color .25s ease;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    color: #ffffff;
    background-color: transparent;

    ${({ light }) =>
      light
        ? css`
            background-color: rgba(255, 255, 255, 0.98);
          `
        : css`
            a {
              color: #dddddd;
              &:hover {
                color: #ffffff;
              }
            }
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
  font-family: "Tangerine", sans-serif;
  font-size: 2em;
  font-weight: 600;

  margin: 0;
`;
