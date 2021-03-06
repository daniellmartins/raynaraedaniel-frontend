import React, { Component } from "react";
import { withRouter } from "next/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import _orderBy from "lodash/orderBy";
import styled from "styled-components";

import { CartList } from "./";
import { Shopping } from "../icons";

class CartButton extends Component {
  componentDidMount() {
    this.props.subscribeToMore();
  }

  render() {
    const { loading, data, handleOpen, hidden } = this.props;
    if (hidden) return null;
    return (
      <StyledCartButton
        onClick={handleOpen}
        onMouseEnter={() => handleOpen(true)}
      >
        <Shopping fill="#ffffff" />
        {!loading && <span>{!data || !data.cart ? 0 : data.cart.length}</span>}
      </StyledCartButton>
    );
  }
}

class MyCart extends Component {
  state = { open: false };

  handleOpen = value => {
    if (window.innerWidth <= 768) {
      return this.props.router.push("/cart", "/carrinho");
    }

    return this.setState({ open: value === true ? true : !this.state.open });
  };

  render() {
    const { open } = this.state;
    return (
      <StyledCart>
        <Query query={CART_QUERY}>
          {({ subscribeToMore, ...rest }) => (
            <CartButton
              hidden={this.props.hidden}
              {...rest}
              handleOpen={this.handleOpen}
              subscribeToMore={() => {
                subscribeToMore({
                  document: CART_SUBSCRIPTION,
                  onError: error => console.log(error),
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const { mutation, node } = subscriptionData.data.cart;
                    let cart;

                    switch (mutation) {
                      case "CREATED":
                        cart = [node, ...prev.cart];
                        break;
                      case "UPDATED":
                        cart = [
                          node,
                          ...prev.cart.filter(c => c._id !== node._id)
                        ];
                        break;
                      case "DELETED":
                        cart = prev.cart.filter(c => c._id !== node._id);
                        break;
                      default:
                        break;
                    }

                    return {
                      ...prev,
                      cart: _orderBy(cart, ["createdAt"])
                    };
                  }
                });
              }}
            />
          )}
        </Query>

        {open && (
          <StyledCartBox>
            <CartList fixed />
          </StyledCartBox>
        )}
      </StyledCart>
    );
  }
}

export const Cart = withRouter(MyCart);

const CART_TYPE = `
  _id
  product {
    _id
    name
    price
    quantity
    stock
  }
  quantity
  createdAt
`;

export const CART_QUERY = gql`
  {
    cart {
      ${CART_TYPE}
    }
  }
`;

const CART_SUBSCRIPTION = gql`
  subscription {
    cart {
      mutation
      node {
        ${CART_TYPE}
      }  
    }
  }
`;

const StyledCart = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 2000;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    top: 1rem;
    bottom: auto;
  }
`;

const StyledCartButton = styled.button`
  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;

  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.primary};

  span {
    font-size: 1em;
    margin-left: 5px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 3rem;
    height: 3rem;

    span {
      font-size: 0.875em;
    }
  }
`;

const StyledCartBox = styled.div`
  position: absolute;
  top: 4.5rem;
  right: 0;

  width: 500px;
  height: 500px;

  background-color: #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;
