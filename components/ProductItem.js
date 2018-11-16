import React from "react";
import styled from "styled-components";

export const ProductItem = ({ product }) => (
  <StyledProductItem>
    <h1>{product.name}</h1>
  </StyledProductItem>
);

const StyledProductItem = styled.article`
  text-align: center;

  flex: 0 0 25%;

  h1 {
    font-size: 1em;
  }
`;
