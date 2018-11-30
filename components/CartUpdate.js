import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

export const CartUpdate = ({ product, quantity, children }) => {
  if (quantity === 0)
    return (
      <Mutation mutation={REMOVE_CART_MUTATION}>
        {(update, { loading }) => (
          <StyledButton
            disabled={loading || quantity - 1 === product.stock}
            onClick={() => {
              update({ variables: { productId: product._id, quantity } });
            }}
          >
            {children}
          </StyledButton>
        )}
      </Mutation>
    );
  return (
    <Mutation mutation={ADD_CART_MUTATION}>
      {(update, { loading }) => (
        <StyledButton
          disabled={loading || quantity - 1 === product.stock}
          onClick={() => {
            update({ variables: { productId: product._id, quantity } });
          }}
        >
          {children}
        </StyledButton>
      )}
    </Mutation>
  );
};

export const ADD_CART_MUTATION = gql`
  mutation addCart($productId: ID!, $quantity: Int!) {
    addCart(data: { productId: $productId, quantity: $quantity }) {
      _id
      product {
        _id
        name
        price
        quantity
        stock
        cart {
          _id
          quantity
        }
      }
      quantity
    }
  }
`;

const REMOVE_CART_MUTATION = gql`
  mutation removeCart($productId: ID!) {
    removeCart(data: { productId: $productId }) {
      _id
      product {
        _id
        name
        price
        quantity
        stock
        cart {
          _id
          quantity
        }
      }
      quantity
    }
  }
`;

const StyledButton = styled.button`
  color: ${({ theme }) => theme.color.primary};
  font-size: 0.875em;

  padding: 0.25em;
  width: 1.5rem;
  height: 1.5rem;

  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  background-color: #ffffff;

  &:hover {
    color: #ffffff;
    background-color: ${({ theme }) => theme.color.primary};
  }

  &:disabled {
    color: #cccccc;
    border-color: #cccccc;

    cursor: default;

    &:hover {
      color: #cccccc;
      background-color: #ffffff;
    }
  }
`;
