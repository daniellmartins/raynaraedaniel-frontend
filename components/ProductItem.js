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
    </StyledProductItem>
  );
};

const StyledProductItem = styled.article`
  color: ${({ theme }) => theme.color.dark};
  text-align: center;

  cursor: pointer;

  border-radius: 4px;
  border: 1px solid #eeeeee;
  background-color: #ffffff;

  transition: border 0.25s linear;

  &:hover {
    border: 1px solid #dddddd;
  }

  img {
    max-width: 100%;
  }

  h1 {
    font-size: 0.875em;
  }

  p {
    opacity: 0.6;
    font-size: 0.875em;
    margin: 0;
  }

  div {
    padding: 0.75rem;
  }
`;
