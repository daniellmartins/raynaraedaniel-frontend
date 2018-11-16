import React, { Component } from "react";
import styled from "styled-components";

import { Container, ProductItem } from "./";

export class ProductList extends Component {
  componentDidMount() {
    this.props.subscribeToProducts();
  }

  render() {
    const { loading, error, data, orderBy, onChangeOrderBy } = this.props;
    if (loading) return <p>loading...</p>;
    if (error) return <p>error</p>;
    return (
      <StyledProductList>
        <select value={orderBy} onChange={onChangeOrderBy}>
          <option value="name_ASC">Nome</option>
          <option value="price_ASC">Menor Preço</option>
          <option value="price_DESC">Maior Preço</option>
        </select>

        <StyledContainer>
          {data.products.map(product => (
            <ProductItem key={product._id} product={product} />
          ))}
        </StyledContainer>
      </StyledProductList>
    );
  }
}

const StyledProductList = styled.section`
  margin-top: 100px;
  padding: 50px 0;

  background-color: #ffffff;
`;

const StyledContainer = styled(Container)`
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(2, 1fr);

  padding: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-gap: 1.875em;
    grid-template-columns: repeat(5, 1fr);
  }
`;
