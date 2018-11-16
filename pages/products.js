import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import _ from "lodash";

import { SignIn, ProductList } from "../components";
import { checkLoggedIn } from "../lib";

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.state = { orderBy: "price_ASC" };
  }

  static async getInitialProps({ apolloClient }) {
    const { me } = await checkLoggedIn(apolloClient);
    return { ...me };
  }

  onChangeOrderBy = e => {
    this.setState({ orderBy: e.target.value });
  };

  render() {
    const { me } = this.props;
    const { orderBy } = this.state;
    if (!me) return <SignIn />;
    return (
      <Query query={PRODUCTS_QUERY} variables={{ orderBy }}>
        {({ subscribeToMore, ...rest }) => (
          <ProductList
            orderBy={orderBy}
            onChangeOrderBy={this.onChangeOrderBy}
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
                    products: _.remove(
                      _.orderBy(
                        products,
                        [sort(orderBy)[0]],
                        [sort(orderBy)[1]]
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
    );
  }
}

function sort(orderBy) {
  const sort = orderBy ? orderBy.split("_") : "";
  return [sort[0], sort[1].toLowerCase()];
}

const PRODUCT_TYPE = `
  _id
  name
  price
  quantity
  photoUrl
  active
  createdAt
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
