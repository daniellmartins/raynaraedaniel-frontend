import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import _ from "lodash";

import { SignIn, ProductList } from "../components";
import { checkLoggedIn } from "../lib";

const PRODUCTS_QUERY = gql`
  query products($orderBy: ProductOrderByInput) {
    products(orderBy: $orderBy) {
      id
      name
      description
      price
      quantity
      photoUrl
      active
      createdAt
      updatedAt
    }
  }
`;

const PRODUCT_SUBSCRIPTION = gql`
  subscription {
    product {
      mutation
      node {
        id
        name
        description
        price
        quantity
        photoUrl
        active
        createdAt
        updatedAt
      }
    }
  }
`;

export default class Products extends Component {
  static async getInitialProps({ apolloClient }) {
    const { me } = await checkLoggedIn(apolloClient);
    return { ...me };
  }

  state = { orderBy: "createdAt_DESC" };

  render() {
    const { me } = this.props;
    const { orderBy } = this.state;
    if (!me) return <SignIn />;
    return (
      <Query query={PRODUCTS_QUERY} variables={{ orderBy }}>
        {({ subscribeToMore, ...rest }) => (
          <ProductList
            {...rest}
            subscribeToProducts={() => {
              subscribeToMore({
                document: PRODUCT_SUBSCRIPTION,
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
                          product => product.id !== node.id
                        )
                      ];
                      break;
                    default:
                      break;
                  }

                  return {
                    ...prev,
                    products: _.remove(
                      _.orderBy(products, ["createdAt"], ["desc"]),
                      product => product.active
                    )
                  };
                }
              });
            }}
          />
        )}
      </Query>
    );
  }
}
