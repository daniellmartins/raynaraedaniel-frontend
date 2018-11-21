import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";

import { CartList } from "../components";
import { Shopping } from "../components/icons";

import { CART_QUERY } from "./";

export class Cart extends Component {
  state = { open: false };

  handleOpen = value => {
    this.setState({ open: value === true ? true : !this.state.open });
  };

  render() {
    const { open } = this.state;
    return (
      <StyledCart>
        <Query query={CART_QUERY}>
          {({ loading, data }) => (
            <button
              onClick={this.handleOpen}
              onMouseEnter={() => this.handleOpen(true)}
            >
              <Shopping fill="#ffffff" />
              {!loading && (
                <span>{!data || !data.cart ? 0 : data.cart.length}</span>
              )}
            </button>
          )}
        </Query>

        {open && (
          <StyledCartBox>
            <CartList />
          </StyledCartBox>
        )}
      </StyledCart>
    );
  }
}

const StyledCart = styled.div`
  position: relative;

  button {
    color: #ffffff;

    outline: none;

    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;

    border-radius: 50%;
    /* border: 1px solid #ffffff; */
    border: 1px solid ${({ theme }) => theme.color.primary};
    background-color: ${({ theme }) => theme.color.primary};

    span {
      font-size: 0.875em;
      margin-left: 5px;
    }
  }
`;

const StyledCartBox = styled.div`
  position: absolute;
  top: 4.5rem;
  right: 0;

  width: 400px;
  height: 500px;

  background-color: #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;
