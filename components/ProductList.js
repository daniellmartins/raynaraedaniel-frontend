import React, { Component } from "react";
import styled from "styled-components";

import { Container, ProductItem } from "./";
import { ProductHeader } from "./ProductHeader";

export class ProductList extends Component {
  componentDidMount() {
    this.props.subscribeToMore();
  }

  renderProducts = () => {
    const { loading, error, data } = this.props;
    if (loading) return <p>loading...</p>;
    if (error) return <p>error</p>;
    return (
      <StyledProductListGrid>
        {data.products.map(product => (
          <ProductItem key={product._id} product={product} />
        ))}
      </StyledProductListGrid>
    );
  };

  render() {
    const { orderBy, onChangeOrderBy } = this.props;
    return (
      <StyledProductList>
        <Container>
          <ProductHeader orderBy={orderBy} onChangeOrderBy={onChangeOrderBy} />
          {this.renderProducts()}
        </Container>
      </StyledProductList>
    );
  }
}

const StyledProductList = styled.section`
  padding: 50px 0;

  /* background-color: #ffffff; */
`;

const StyledProductListGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-gap: 1.875em;
    grid-template-columns: repeat(5, 1fr);
  }
`;
