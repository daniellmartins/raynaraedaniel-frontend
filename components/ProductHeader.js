import React from "react";
import styled from "styled-components";

export const ProductHeader = ({ orderBy, onChangeOrderBy }) => (
  <StyledProductHeader>
    <select value={orderBy} onChange={onChangeOrderBy}>
      <option value="name_ASC">Nome</option>
      <option value="price_ASC">Menor Preço</option>
      <option value="price_DESC">Maior Preço</option>
    </select>
  </StyledProductHeader>
);

const StyledProductHeader = styled.header`
  padding: 1em 0;
`;
