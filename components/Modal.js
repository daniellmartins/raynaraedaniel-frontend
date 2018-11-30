import React, { Component } from "react";
import { createPortal } from "react-dom";
import isNil from "lodash/fp/isNil";
import styled, { css, keyframes } from "styled-components";

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.modalOverlay = React.createRef();
  }

  componentDidMount() {
    this.modalRoot = document.getElementById("modal");
    this.el = document.createElement("div");
    this.modalRoot.appendChild(this.el);
    this._addEventListener();
    document.querySelector("body").style.overflow = "hidden";
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
      if (this.props.loading) {
        this._removeEventListener();
      } else {
        this._addEventListener();
      }
    }
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
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
    const { onCloseRequest } = this.props;
    const keys = {
      27: () => {
        e.preventDefault();
        onCloseRequest();
        window.removeEventListener("keyup", this._handleKeyUp, false);
      }
    };
    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  };

  _handleOutsideClick = e => {
    const { onCloseRequest } = this.props;
    if (!isNil(this.modalOverlay)) {
      if (this.modalOverlay.current === e.target) {
        onCloseRequest();
        document.removeEventListener("click", this._handleOutsideClick, false);
      }
    }
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <StyledModalOverlay ref={this.modalOverlay}>
        <StyledModal>{children}</StyledModal>
      </StyledModalOverlay>,
      this.el
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
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  overflow-x: hidden;
  overflow-y: auto;

  opacity: 1;
  background-color: rgba(0, 0, 0, 0.85);

  animation: ${show} 0.5s ease;
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
