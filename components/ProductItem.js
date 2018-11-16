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
      <h1>{product.name}</h1>
      <p>{quantity} de</p>
      <b>R$ {price}</b>
    </StyledProductItem>
  );
};

const StyledProductItem = styled.article`
  text-align: center;

  cursor: pointer;
  padding: 0.75rem;

  border-radius: 4px;
  background-color: #ffffff;

  transition: box-shadow 0.25s linear;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
`;
