import React from "react";
import styled from "styled-components";

export const ProductItem = ({ product }) => {
  const quantity =
    product.quantity > 1 ? `faltam ${product.quantity} itens` : `falta 1 item`;
  const stock = `${product.stock} ${product.stock > 1 ? `itens` : `item`}`;
  const price = product.price.toFixed(2).replace(".", ",");
  return (
    <StyledProductItem stock={product.stock === 0 ? true : false}>
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
      <div>
        <h1>{product.name}</h1>
        <p>{stock} de</p>
        <b>R$ {price}</b>
        <p>{quantity}</p>
      </div>
      <button disabled={product.stock === 0 ? true : false}>
        {product.stock === 0 ? "Comprado" : "Comprar"}
      </button>
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
  border: 1px solid transparent;
  background-color: #ffffff;

  transition: border 0.15s linear;

  &:hover {
    border-color: ${({ theme, stock }) =>
      stock ? "transparent" : theme.color.primary};
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.05); */
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

  div {
    padding: 0 0.75rem 1em;
  }

  button {
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
  }
`;
