import React from "react";
import Link from "next/link";
import { Mutation } from "react-apollo";
import styled from "styled-components";

import { formatMoney } from "../lib";
import { CartUpdate, ADD_CART_MUTATION } from "./";

export const ProductItem = ({ product }) => {
  const quantity =
    product.quantity > 1 ? `faltam ${product.quantity} itens` : `falta 1 item`;
  const stock = `${product.stock} ${product.stock > 1 ? `itens` : `item`}`;
  return (
    <StyledProductItem
      stock={product.stock === 0 ? true : false}
      cart={product.cart ? true : false}
    >
      <picture>
        <source
          type="image/webp"
          srcSet={`${process.env.API_CDN_URL}/images/products/${
            product._id
          }.webp`}
        />
        <source
          type="image/jpeg"
          srcSet={`${process.env.API_CDN_URL}/images/products/${
            product._id
          }.jpg`}
        />
        <img
          src={`${process.env.API_CDN_URL}/images/products/${product._id}.jpg`}
          alt=""
        />
      </picture>
      <StyledContent>
        <h1>{product.name}</h1>
        <p>{stock} de</p>
        <b>R$ {formatMoney(product.price)}</b>
        <p>{quantity}</p>
        {product.reserved && (
          <Link
            scroll={false}
            href={{
              pathname: "/products",
              query: { id: product._id }
            }}
            as={`/lista-de-presentes/${product._id}`}
          >
            <a>Comprar em loja física</a>
          </Link>
        )}
      </StyledContent>
      {product.cart ? (
        <StyledButtonGroup>
          <CartUpdate product={product} quantity={product.cart.quantity - 1}>
            -
          </CartUpdate>
          <div>{product.cart.quantity}</div>
          <CartUpdate product={product} quantity={product.cart.quantity + 1}>
            +
          </CartUpdate>
        </StyledButtonGroup>
      ) : (
        <Mutation mutation={ADD_CART_MUTATION}>
          {(update, { loading }) => (
            <StyledButton
              disabled={loading || product.stock === 0 ? true : false}
              onClick={() => {
                update({ variables: { productId: product._id, quantity: 1 } });
              }}
            >
              {product.stock === 0 ? "Comprado" : "Comprar"}
            </StyledButton>
          )}
        </Mutation>
      )}
    </StyledProductItem>
  );
};

const StyledProductItem = styled.article`
  color: ${({ theme }) => theme.color.dark};
  text-align: center;

  cursor: ${({ stock }) => (stock ? "default" : "pointer")};
  overflow: hidden;
  padding-bottom: 1em;

  opacity: ${({ stock }) => (stock ? "0.5" : "1")};
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, cart }) =>
    cart ? theme.color.primary : "transparent"};
  background-color: #ffffff;

  transition: border 0.15s linear;

  &:hover {
    border-color: ${({ theme, stock }) =>
      stock ? "transparent" : theme.color.primary};
  }

  img {
    max-width: 100%;
  }

  h1 {
    font-size: 0.875em;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0;
  }

  p {
    opacity: ${({ stock }) => (stock ? "0" : "0.6")};
    font-size: 0.875em;
    margin: 0;
  }
`;

const StyledContent = styled.div`
  padding: 0 0.75rem 1em;
`;

const StyledButton = styled.button`
  color: ${({ theme }) => theme.color.primary};
  font-size: 0.875em;

  padding: 0.625em 1em;
  width: 80%;

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

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;

  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  background-color: #ffffff;
  overflow: hidden;

  button {
    width: auto;
    height: auto;
    padding: 0.625em 1em;

    border-radius: 0;
    border-top: 0;
    border-bottom: 0;

    &:first-child {
      border-left: 0;
    }
    &:last-child {
      border-right: 0;
    }
  }
`;
