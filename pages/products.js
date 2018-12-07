import React, { Component } from "react";
import { withRouter } from "next/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import _orderBy from "lodash/orderBy";
import _remove from "lodash/remove";
import styled from "styled-components";

import { checkLoggedIn } from "../lib";
import {
  SignIn,
  Banner,
  Cart,
  ProductList,
  ProductReserved,
  Page,
  Meta,
  Header,
  Footer
} from "../components";

class Products extends Component {
  state = { orderBy: "price_ASC" };

  static async getInitialProps({ apolloClient }) {
    const { me } = await checkLoggedIn(apolloClient);
    return { ...me };
  }

  sort = () => {
    const sort = this.state.orderBy ? this.state.orderBy.split("_") : "";
    return [sort[0], sort[1].toLowerCase()];
  };

  renderProducts = () => {
    const { me } = this.props;
    const { orderBy } = this.state;

    if (!me) return <SignIn />;
    return (
      <>
        <Query query={PRODUCTS_QUERY} variables={{ orderBy }}>
          {({ subscribeToMore, ...rest }) => (
            <ProductList
              {...rest}
              subscribeToMore={() => {
                subscribeToMore({
                  document: PRODUCT_SUBSCRIPTION,
                  variables: { orderBy },
                  onError: error => console.log(error),
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const { mutation, node } = subscriptionData.data.product;
                    let products;

                    switch (mutation) {
                      case "CREATED":
                        products = [node, ...prev.products];
                        break;
                      case "UPDATED":
                        products = [
                          node,
                          ...prev.products.filter(
                            product => product._id !== node._id
                          )
                        ];
                        break;
                      case "DELETED":
                        products = prev.products.filter(
                          product => product._id !== node._id
                        );
                        break;
                      default:
                        break;
                    }

                    return {
                      ...prev,
                      products: _remove(
                        _orderBy(
                          products,
                          ["quantity", this.sort()[0]],
                          ["asc", this.sort()[1]]
                        ),
                        product => product.active
                      )
                    };
                  }
                });
              }}
            />
          )}
        </Query>
        <Footer />
      </>
    );
  };

  render() {
    const { me, router } = this.props;
    const { animate } = this.state;

    return (
      <Page>
        {router.query && router.query.id && (
          <ProductReserved productId={router.query.id} />
        )}
        <Meta />
        <Header />
        <Cart />
        <Banner size={me && "medium"}>
          <Title>Lista de Presentes</Title>
          <SubTitle>
            Ajude os noivos a montar a casa nova <br />
            ou desfrutar de um passeio inesquecível de lua de mel. Presenteie!
          </SubTitle>
        </Banner>
        {this.renderProducts()}
      </Page>
    );
  }
}

export default withRouter(Products);

const PRODUCT_TYPE = `
  _id
  name
  price
  quantity
  stock
  reserved
  active
  cart {
    _id
    quantity
  }
`;

const PRODUCTS_QUERY = gql`
  query products($orderBy: ProductOrderByInput) {
    products(orderBy: $orderBy) {
      ${PRODUCT_TYPE}
    }
  }
`;

const PRODUCT_SUBSCRIPTION = gql`
  subscription {
    product {
      mutation
      node {
        ${PRODUCT_TYPE}
      }
    }
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-family: "Tangerine", sans-serif;
  font-size: 2.5em;

  padding-top: 80px;
  margin: 2rem 0 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3.5em;
  }
`;

const SubTitle = styled.h2`
  color: #ffffff;
  font-size: 1.2em;
  font-family: "Playfair Display", sans-serif;
  font-style: italic;
  font-weight: 500;
  text-align: center;

  margin: 0 0 1.5em;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.4em;
  }
`;
