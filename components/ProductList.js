import React, { Component } from "react";
import styled from "styled-components";

import { Container, ProductItem } from "./";

export class ProductList extends Component {
  componentDidMount() {
    this.props.subscribeToProducts();
  }

  render() {
    const { loading, error, data } = this.props;
    if (loading) return <p>loading...</p>;
    if (error) return <p>error</p>;
    return (
      <StyledProductList>
        <Container>
          <StyledProductListInner>
            {data.products.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </StyledProductListInner>
        </Container>
      </StyledProductList>
    );
  }
}

const StyledProductList = styled.section``;

const StyledProductListInner = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  padding-top: 100px;
`;
