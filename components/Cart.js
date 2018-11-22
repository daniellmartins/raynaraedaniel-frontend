import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import _ from "lodash";
import styled from "styled-components";

import { CartList } from "../components";
import { Shopping } from "../components/icons";

class MyCart extends Component {
  componentDidMount() {
    this.props.subscribeToMore();
  }

  render() {
    const { loading, data, handleOpen } = this.props;
    return (
      <button onClick={handleOpen} onMouseEnter={() => handleOpen(true)}>
        <Shopping fill="#ffffff" />
        {!loading && <span>{!data || !data.cart ? 0 : data.cart.length}</span>}
      </button>
    );
  }
}

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
          {({ subscribeToMore, ...rest }) => (
            <MyCart
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
                      cart: _.orderBy(cart, ["createdAt"])
                    };
                  }
                });
              }}
            />
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

const CART_TYPE = `
  _id
  product {
    _id
    name
    price
    quantity
    createdAt
    updatedAt
  }
  quantity
  createdAt
  updatedAt
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
