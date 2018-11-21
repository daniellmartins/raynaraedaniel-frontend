import React from "react";
import styled from "styled-components";

export const ProductItem = ({ product }) => {
  const quantity = `${product.quantity} ${
    product.quantity > 1 ? "itens" : "item"
  }`;
  const price = product.price.toFixed(2).replace(".", ",");
  return (
    <StyledProductItem>
      <img
        src={`${process.env.API_HTTP_URL}/assets/products/${product._id}.jpg`}
        alt=""
      />
      <div>
        <h1>{product.name}</h1>
        <p>{quantity} de</p>
        <b>R$ {price}</b>
      </div>
      <button>Comprar</button>
    </StyledProductItem>
  );
};

const StyledProductItem = styled.article`
  color: ${({ theme }) => theme.color.dark};
  text-align: center;

  cursor: pointer;
  overflow: hidden;
  padding-bottom: 1em;

  border-radius: 4px;
  border: 1px solid #eeeeee;
  background-color: #ffffff;

  transition: border 0.25s linear;

  &:hover {
    border: 1px solid ${({ theme }) => theme.color.primary};
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
    opacity: 0.6;
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

    outline: none;
    cursor: pointer;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.color.primary};
    background-color: #ffffff;

    transition: all 0.25s linear;

    &:hover {
      color: #ffffff;
      background-color: ${({ theme }) => theme.color.primary};
    }
  }
`;
