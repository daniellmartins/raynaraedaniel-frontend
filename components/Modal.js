import React, { Component } from "react";
import _isNil from "lodash/fp/isNil";
import styled, { css, keyframes } from "styled-components";

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.modalOverlay = React.createRef();
  }

  componentDidMount() {
    this._addEventListener();
    document.querySelector("body").style.overflow = "hidden";
  }

  componentWillUnmount() {
    this._removeEventListener();
    document.querySelector("body").style.overflow = "auto";
  }

  _addEventListener = () => {
    window.addEventListener("keyup", this._handleKeyUp, false);
    document.addEventListener("click", this._handleOutsideClick, false);
  };

  _removeEventListener = () => {
    window.removeEventListener("keyup", this._handleKeyUp, false);
    document.removeEventListener("click", this._handleOutsideClick, false);
  };

  _handleKeyUp = e => {
    const keys = {
      27: () => {
        e.preventDefault();
        window.history.back();
        window.removeEventListener("keyup", this._handleKeyUp, false);
      }
    };
    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  };

  _handleOutsideClick = e => {
    if (!_isNil(this.modalOverlay)) {
      if (this.modalOverlay.current === e.target) {
        window.history.back();
        document.removeEventListener("click", this._handleOutsideClick, false);
      }
    }
  };

  render() {
    return (
      <StyledModalOverlay ref={this.modalOverlay}>
        <StyledModal>{this.props.children}</StyledModal>
      </StyledModalOverlay>
    );
  }
}

const show = keyframes`
  0% {
    display: none;
    opacity: 0;
  }

  1% {
    display: flex;
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999999;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  overflow-x: hidden;
  overflow-y: auto;

  background-color: rgba(0, 0, 0, 0.8);

  animation: ${show} 0.5s ease forwards;
`;

const StyledModal = styled.div`
  position: relative;

  overflow: hidden;
  width: 100%;
  min-height: 100px;

  border-radius: 4px;
  background-color: white;
  box-shadow: 1px 3px 3px 0 rgba(0, 0, 0, 0.2),
    1px 3px 15px 2px rgba(0, 0, 0, 0.2);

  ${({ primary, theme }) =>
    primary &&
    css`
      ${StyledModalHeader} {
        color: #ffffff;
        background-color: ${theme.color.primary};
      }
      ${StyledButton} {
        border-color: #ffffff;

        &:hover {
          color: ${theme.color.primary};
          background-color: #ffffff;

          svg {
            fill: ${theme.color.primary};
          }
        }
      }
    `};

  @media (min-width: 576px) {
    width: ${({ size }) =>
      size === "large" ? "56em" : size === "small" ? "25em" : "40em"};
  }
`;
